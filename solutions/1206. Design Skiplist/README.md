# [1206. Design Skiplist](https://leetcode.com/problems/design-skiplist)

## Description

<div class="elfjS" data-track-load="description_content"><p>Design a <strong>Skiplist</strong> without using any built-in libraries.</p>

<p>A <strong>skiplist</strong> is a data structure that takes <code>O(log(n))</code> time to add, erase and search. Comparing with treap and red-black tree which has the same function and performance, the code length of Skiplist can be comparatively short and the idea behind Skiplists is just simple linked lists.</p>

<p>For example, we have a Skiplist containing <code>[30,40,50,60,70,90]</code> and we want to add <code>80</code> and <code>45</code> into it. The Skiplist works this way:</p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2019/09/27/1506_skiplist.gif" style="width: 500px; height: 173px;"><br>
<small>Artyom Kalinin [CC BY-SA 3.0], via <a href="https://commons.wikimedia.org/wiki/File:Skip_list_add_element-en.gif" target="_blank" title="Artyom Kalinin [CC BY-SA 3.0 (https://creativecommons.org/licenses/by-sa/3.0)], via Wikimedia Commons">Wikimedia Commons</a></small></p>

<p>You can see there are many layers in the Skiplist. Each layer is a sorted linked list. With the help of the top layers, add, erase and search can be faster than <code>O(n)</code>. It can be proven that the average time complexity for each operation is <code>O(log(n))</code> and space complexity is <code>O(n)</code>.</p>

<p>See more about Skiplist: <a href="https://en.wikipedia.org/wiki/Skip_list" target="_blank">https://en.wikipedia.org/wiki/Skip_list</a></p>

<p>Implement the <code>Skiplist</code> class:</p>

<ul>
	<li><code>Skiplist()</code> Initializes the object of the skiplist.</li>
	<li><code>bool search(int target)</code> Returns <code>true</code> if the integer <code>target</code> exists in the Skiplist or <code>false</code> otherwise.</li>
	<li><code>void add(int num)</code> Inserts the value <code>num</code> into the SkipList.</li>
	<li><code>bool erase(int num)</code> Removes the value <code>num</code> from the Skiplist and returns <code>true</code>. If <code>num</code> does not exist in the Skiplist, do nothing and return <code>false</code>. If there exist multiple <code>num</code> values, removing any one of them is fine.</li>
</ul>

<p>Note that duplicates may exist in the Skiplist, your code needs to handle this situation.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input</strong>
["Skiplist", "add", "add", "add", "search", "add", "search", "erase", "erase", "search"]
[[], [1], [2], [3], [0], [4], [1], [0], [1], [1]]
<strong>Output</strong>
[null, null, null, null, false, null, true, false, true, false]

<strong>Explanation</strong>
Skiplist skiplist = new Skiplist();
skiplist.add(1);
skiplist.add(2);
skiplist.add(3);
skiplist.search(0); // return False
skiplist.add(4);
skiplist.search(1); // return True
skiplist.erase(0);  // return False, 0 is not in skiplist.
skiplist.erase(1);  // return True
skiplist.search(1); // return False, 1 has already been erased.</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>0 &lt;= num, target &lt;= 2 * 10<sup>4</sup></code></li>
	<li>At most <code>5 * 10<sup>4</sup></code> calls will be made to <code>search</code>, <code>add</code>, and <code>erase</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Topological Sort`**

- Time complexity: <em>O(logn)</em>
- Space complexity: <em>O(add() calls)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
class Node {
  constructor(val, next = null, down = null) {
    this.val = val;
    this.next = next;
    this.down = down;
  }
}

const Skiplist = function () {
  this.head = new Node(-1);
};

/**
 * @param {number} target
 * @return {boolean}
 */
Skiplist.prototype.search = function (target) {
  let current = this.head;

  while (current) {
    while (current.next?.val < target) {
      current = current.next;
    }
    if (current.next?.val === target) return true;

    current = current.down;
  }
  return false;
};

/**
 * @param {number} num
 * @return {void}
 */
Skiplist.prototype.add = function (num) {
  const nodes = [];
  let current = this.head;
  let isInsert = true;
  let down = null;

  while (current) {
    while (current.next?.val < num) {
      current = current.next;
    }
    nodes.push(current);
    current = current.down;
  }

  while (nodes.length && isInsert) {
    const node = nodes.pop();

    node.next = new Node(num, node.next, down);
    down = node.next;
    isInsert = Math.random() > 0.5;
  }
  if (!isInsert) return;

  this.head = new Node(-1, null, this.head);
};

/**
 * @param {number} num
 * @return {boolean}
 */
Skiplist.prototype.erase = function (num) {
  let current = this.head;
  let result = false;

  while (current) {
    while (current.next?.val < num) {
      current = current.next;
    }
    if (current.next?.val === num) {
      current.next = current.next.next;
      result = true;
    }
    current = current.down;
  }
  return result;
};

/**
 * Your Skiplist object will be instantiated and called as such:
 * var obj = new Skiplist()
 * var param_1 = obj.search(target)
 * obj.add(num)
 * var param_3 = obj.erase(num)
 */
```
