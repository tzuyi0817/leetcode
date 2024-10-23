# [1028. Recover a Tree From Preorder Traversal](https://leetcode.com/problems/recover-a-tree-from-preorder-traversal)

## Description

<div class="elfjS" data-track-load="description_content"><p>We run a&nbsp;preorder&nbsp;depth-first search (DFS) on the <code>root</code> of a binary tree.</p>

<p>At each node in this traversal, we output <code>D</code> dashes (where <code>D</code> is the depth of this node), then we output the value of this node.&nbsp; If the depth of a node is <code>D</code>, the depth of its immediate child is <code>D + 1</code>.&nbsp; The depth of the <code>root</code> node is <code>0</code>.</p>

<p>If a node has only one child, that child is guaranteed to be <strong>the left child</strong>.</p>

<p>Given the output <code>traversal</code> of this traversal, recover the tree and return <em>its</em> <code>root</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2024/09/10/recover_tree_ex1.png" style="width: 423px; height: 200px;">
<pre><strong>Input:</strong> traversal = "1-2--3--4-5--6--7"
<strong>Output:</strong> [1,2,5,3,4,6,7]
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2024/09/10/recover_tree_ex2.png" style="width: 432px; height: 250px;">
<pre><strong>Input:</strong> traversal = "1-2--3---4-5--6---7"
<strong>Output:</strong> [1,2,5,3,null,6,null,4,null,7]
</pre>

<p><strong class="example">Example 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2024/09/10/recover_tree_ex3.png" style="width: 305px; height: 250px;">
<pre><strong>Input:</strong> traversal = "1-401--349---90--88"
<strong>Output:</strong> [1,401,null,349,88,90]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li>The number of nodes in the original tree is in the range <code>[1, 1000]</code>.</li>
	<li><code>1 &lt;= Node.val &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Depth-First Search`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {string} traversal
 * @return {TreeNode}
 */
const recoverFromPreorder = function (traversal) {
  const n = traversal.length;
  let index = 0;

  const generateTree = depth => {
    let level = 0;

    while (index < n && traversal[index] === '-') {
      level += 1;
      index += 1;
    }
    if (level !== depth) {
      index -= level;
      return null;
    }
    let value = '';

    while (index < n && traversal[index] !== '-') {
      value += traversal[index];
      index += 1;
    }
    const node = new TreeNode(+value);

    node.left = generateTree(depth + 1);
    node.right = generateTree(depth + 1);

    return node;
  };

  return generateTree(0);
};
```
