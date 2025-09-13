# [460. LFU Cache](https://leetcode.com/problems/lfu-cache)

## Description

<div class="elfjS" data-track-load="description_content"><p>Design and implement a data structure for a <a href="https://en.wikipedia.org/wiki/Least_frequently_used" target="_blank">Least Frequently Used (LFU)</a> cache.</p>

<p>Implement the <code>LFUCache</code> class:</p>

<ul>
	<li><code>LFUCache(int capacity)</code> Initializes the object with the <code>capacity</code> of the data structure.</li>
	<li><code>int get(int key)</code> Gets the value of the <code>key</code> if the <code>key</code> exists in the cache. Otherwise, returns <code>-1</code>.</li>
	<li><code>void put(int key, int value)</code> Update the value of the <code>key</code> if present, or inserts the <code>key</code> if not already present. When the cache reaches its <code>capacity</code>, it should invalidate and remove the <strong>least frequently used</strong> key before inserting a new item. For this problem, when there is a <strong>tie</strong> (i.e., two or more keys with the same frequency), the <strong>least recently used</strong> <code>key</code> would be invalidated.</li>
</ul>

<p>To determine the least frequently used key, a <strong>use counter</strong> is maintained for each key in the cache. The key with the smallest <strong>use counter</strong> is the least frequently used key.</p>

<p>When a key is first inserted into the cache, its <strong>use counter</strong> is set to <code>1</code> (due to the <code>put</code> operation). The <strong>use counter</strong> for a key in the cache is incremented either a <code>get</code> or <code>put</code> operation is called on it.</p>

<p>The functions&nbsp;<code data-stringify-type="code">get</code>&nbsp;and&nbsp;<code data-stringify-type="code">put</code>&nbsp;must each run in <code>O(1)</code> average time complexity.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input</strong>
["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]
<strong>Output</strong>
[null, null, null, 1, null, -1, 3, null, -1, 3, 4]

<strong>Explanation</strong>
// cnt(x) = the use counter for key x
// cache=[] will show the last used order for tiebreakers (leftmost element is  most recent)
LFUCache lfu = new LFUCache(2);
lfu.put(1, 1);   // cache=[1,_], cnt(1)=1
lfu.put(2, 2);   // cache=[2,1], cnt(2)=1, cnt(1)=1
lfu.get(1);      // return 1
                 // cache=[1,2], cnt(2)=1, cnt(1)=2
lfu.put(3, 3);   // 2 is the LFU key because cnt(2)=1 is the smallest, invalidate 2.
&nbsp;                // cache=[3,1], cnt(3)=1, cnt(1)=2
lfu.get(2);      // return -1 (not found)
lfu.get(3);      // return 3
                 // cache=[3,1], cnt(3)=2, cnt(1)=2
lfu.put(4, 4);   // Both 1 and 3 have the same cnt, but 1 is LRU, invalidate 1.
                 // cache=[4,3], cnt(4)=1, cnt(3)=2
lfu.get(1);      // return -1 (not found)
lfu.get(3);      // return 3
                 // cache=[3,4], cnt(4)=1, cnt(3)=3
lfu.get(4);      // return 4
                 // cache=[4,3], cnt(4)=2, cnt(3)=3
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= capacity&nbsp;&lt;= 10<sup>4</sup></code></li>
	<li><code>0 &lt;= key &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= value &lt;= 10<sup>9</sup></code></li>
	<li>At most <code>2 * 10<sup>5</sup></code>&nbsp;calls will be made to <code>get</code> and <code>put</code>.</li>
</ul>

<p>&nbsp;</p>
<span style="display: none;">&nbsp;</span></div>

<p>&nbsp;</p>

## Solutions

**Solution: `Doubly-Linked List`**

- Time complexity: <em>O(1)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
class Node {
  constructor(key = null, value = null) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
  frequency = 1;
}

class DoublyLinkedList {
  constructor() {
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  addNode(node) {
    const nextNode = this.head.next;

    this.head.next = node;
    node.prev = this.head;
    node.next = nextNode;
    nextNode.prev = node;
  }
  removeNode(node) {
    const { prev: prevNode, next: nextNode } = node;

    prevNode.next = nextNode;
    nextNode.prev = prevNode;
  }
  isEmpty() {
    return this.head.next === this.tail;
  }
  removeTail() {
    if (this.isEmpty()) return null;
    const node = this.tail.prev;

    this.removeNode(node);
    return node;
  }
}

const LFUCache = function (capacity) {
  this.capacity = capacity;
  this.frequencyMap = new Map();
  this.cache = new Map();
  this.minFrequency = 0;
};

LFUCache.prototype.get = function (key) {
  if (!this.cache.has(key)) return -1;
  const node = this.cache.get(key);

  this.updateNode(node);
  return node.value;
};

LFUCache.prototype.put = function (key, value) {
  if (this.cache.has(key)) {
    const node = this.cache.get(key);

    node.value = value;
    this.updateNode(node);
    return;
  }
  if (this.cache.size === this.capacity) {
    const linkedList = this.frequencyMap.get(this.minFrequency);
    const node = linkedList.removeTail();

    this.cache.delete(node.key);
  }
  const node = new Node(key, value);

  this.cache.set(key, node);
  if (!this.frequencyMap.has(1)) {
    this.frequencyMap.set(1, new DoublyLinkedList());
  }
  this.frequencyMap.get(1).addNode(node);
  this.minFrequency = 1;
};

LFUCache.prototype.updateNode = function (node) {
  const { frequency } = node;
  const linkedList = this.frequencyMap.get(frequency);

  linkedList.removeNode(node);
  node.frequency += 1;

  if (frequency === this.minFrequency && linkedList.isEmpty()) {
    this.minFrequency += 1;
  }
  if (!this.frequencyMap.has(node.frequency)) {
    this.frequencyMap.set(node.frequency, new DoublyLinkedList());
  }
  this.frequencyMap.get(node.frequency).addNode(node);
};

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
```
