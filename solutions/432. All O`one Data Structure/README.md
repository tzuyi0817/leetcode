# [432. All O`one Data Structure](https://leetcode.com/problems/all-oone-data-structure)

## Description

<div class="elfjS" data-track-load="description_content"><p>Design a data structure to store the strings' count with the ability to return the strings with minimum and maximum counts.</p>

<p>Implement the <code>AllOne</code> class:</p>

<ul>
	<li><code>AllOne()</code> Initializes the object of the data structure.</li>
	<li><code>inc(String key)</code> Increments the count of the string <code>key</code> by <code>1</code>. If <code>key</code> does not exist in the data structure, insert it with count <code>1</code>.</li>
	<li><code>dec(String key)</code> Decrements the count of the string <code>key</code> by <code>1</code>. If the count of <code>key</code> is <code>0</code> after the decrement, remove it from the data structure. It is guaranteed that <code>key</code> exists in the data structure before the decrement.</li>
	<li><code>getMaxKey()</code> Returns one of the keys with the maximal count. If no element exists, return an empty string <code>""</code>.</li>
	<li><code>getMinKey()</code> Returns one of the keys with the minimum count. If no element exists, return an empty string <code>""</code>.</li>
</ul>

<p><strong>Note</strong> that each function must run in <code>O(1)</code> average time complexity.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input</strong>
["AllOne", "inc", "inc", "getMaxKey", "getMinKey", "inc", "getMaxKey", "getMinKey"]
[[], ["hello"], ["hello"], [], [], ["leet"], [], []]
<strong>Output</strong>
[null, null, null, "hello", "hello", null, "hello", "leet"]

<strong>Explanation</strong>
AllOne allOne = new AllOne();
allOne.inc("hello");
allOne.inc("hello");
allOne.getMaxKey(); // return "hello"
allOne.getMinKey(); // return "hello"
allOne.inc("leet");
allOne.getMaxKey(); // return "hello"
allOne.getMinKey(); // return "leet"
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= key.length &lt;= 10</code></li>
	<li><code>key</code> consists of lowercase English letters.</li>
	<li>It is guaranteed that for each call to <code>dec</code>, <code>key</code> is existing in the data structure.</li>
	<li>At most <code>5 * 10<sup>4</sup></code>&nbsp;calls will be made to <code>inc</code>, <code>dec</code>, <code>getMaxKey</code>, and <code>getMinKey</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Doubly-Linked List`**
- Time complexity: <em>O(1)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
class Node {
    constructor(count) {
        this.count = count;
        this.keys = new Set();
        this.prev = null;
        this.next = null;
    }
}

var AllOne = function() {
    this.keyMap = new Map();
    this.countMap = new Map();
    this.head = new Node(0);
    this.tail = new Node(0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
};

AllOne.prototype.addNode = function(prevNode, node) {
    const nextNode = prevNode.next;

    prevNode.next = node;
    node.prev = prevNode;
    node.next = nextNode;
    nextNode.prev = node;
};

AllOne.prototype.removeNode = function(node) {
    const { prev: prevNode, next: nextNode } = node;

    prevNode.next = nextNode;
    nextNode.prev = prevNode;
};

AllOne.prototype.addKeyToNode = function(prevNode, count, key) {
    if (!this.countMap.has(count)) {
        const newNode = new Node(count);

        this.countMap.set(count, newNode);
        this.addNode(prevNode, newNode);
    }
    this.countMap.get(count).keys.add(key);
}

AllOne.prototype.deleteKeyFromNode = function(node, key) {
    node.keys.delete(key);
    if (node.keys.size) return;
    this.removeNode(node);
    this.countMap.delete(node.count);
}

/** 
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.inc = function(key) {
    if (this.keyMap.has(key)) {
        const count = this.keyMap.get(key);
        const node = this.countMap.get(count);

        this.keyMap.set(key, count + 1);
        this.addKeyToNode(node, count + 1, key);
        this.deleteKeyFromNode(node, key);
        return;
    }
    this.keyMap.set(key, 1);
    this.addKeyToNode(this.head, 1, key);
};

/** 
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.dec = function(key) {
    if (!this.keyMap.has(key)) return;
    const count = this.keyMap.get(key);
    const node = this.countMap.get(count);

    if (count > 1) {
        this.keyMap.set(key, count - 1);
        this.addKeyToNode(node.prev, count - 1, key);
    }
    else this.keyMap.delete(key);
    this.deleteKeyFromNode(node, key);
};

/**
 * @return {string}
 */
AllOne.prototype.getMaxKey = function() {
    if (this.tail.prev === this.head) return '';
    return this.tail.prev.keys.values().next().value;
};

/**
 * @return {string}
 */
AllOne.prototype.getMinKey = function() {
    if (this.head.next === this.tail) return '';
    return this.head.next.keys.values().next().value;
};

/** 
 * Your AllOne object will be instantiated and called as such:
 * var obj = new AllOne()
 * obj.inc(key)
 * obj.dec(key)
 * var param_3 = obj.getMaxKey()
 * var param_4 = obj.getMinKey()
 */
```
