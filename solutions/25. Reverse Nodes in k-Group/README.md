# [25. Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given the <code>head</code> of a linked list, reverse the nodes of the list <code>k</code> at a time, and return <em>the modified list</em>.</p>

<p><code>k</code> is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of <code>k</code> then left-out nodes, in the end, should remain as it is.</p>

<p>You may not alter the values in the list's nodes, only nodes themselves may be changed.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/03/reverse_ex1.jpg" style="width: 542px; height: 222px;">
<pre><strong>Input:</strong> head = [1,2,3,4,5], k = 2
<strong>Output:</strong> [2,1,4,3,5]
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/03/reverse_ex2.jpg" style="width: 542px; height: 222px;">
<pre><strong>Input:</strong> head = [1,2,3,4,5], k = 3
<strong>Output:</strong> [3,2,1,4,5]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li>The number of nodes in the list is <code>n</code>.</li>
	<li><code>1 &lt;= k &lt;= n &lt;= 5000</code></li>
	<li><code>0 &lt;= Node.val &lt;= 1000</code></li>
</ul>

<p>&nbsp;</p>
<p><strong>Follow-up:</strong> Can you solve the problem in <code>O(1)</code> extra memory space?</p>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Iteration`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
const reverseKGroup = function (head, k) {
  const groups = [];
  const reverseNodes = (node, nextNode) => {
    const nodes = [];

    for (let kth = 1; kth <= k; kth++) {
      nodes.push(node);
      node = node.next;
    }
    nodes[0].next = nextNode;
    let previous = nodes[0];

    for (let index = 1; index < nodes.length; index++) {
      nodes[index].next = previous;
      previous = nodes[index];
    }
    return previous;
  };
  let current = head;
  let kth = 0;

  while (current) {
    kth += 1;
    if (kth === 1) groups.push(current);
    if (kth === k) kth = 0;
    current = current.next;
  }
  let nextNode = kth && kth < k ? groups.pop() : null;

  for (let index = groups.length - 1; index >= 0; index--) {
    nextNode = reverseNodes(groups[index], nextNode);
  }
  return nextNode;
};
```
