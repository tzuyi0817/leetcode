# [1932. Merge BSTs to Create Single BST](https://leetcode.com/problems/merge-bsts-to-create-single-bst)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given <code>n</code> <strong>BST (binary search tree) root nodes</strong> for <code>n</code> separate BSTs stored in an array <code>trees</code> (<strong>0-indexed</strong>). Each BST in <code>trees</code> has <strong>at most 3 nodes</strong>, and no two roots have the same value. In one operation, you can:</p>

<ul>
	<li>Select two <strong>distinct</strong> indices <code>i</code> and <code>j</code> such that the value stored at one of the <strong>leaves </strong>of <code>trees[i]</code> is equal to the <strong>root value</strong> of <code>trees[j]</code>.</li>
	<li>Replace the leaf node in <code>trees[i]</code> with <code>trees[j]</code>.</li>
	<li>Remove <code>trees[j]</code> from <code>trees</code>.</li>
</ul>

<p>Return<em> the <strong>root</strong> of the resulting BST if it is possible to form a valid BST after performing </em><code>n - 1</code><em> operations, or</em><em> </em><code>null</code> <i>if it is impossible to create a valid BST</i>.</p>

<p>A BST (binary search tree) is a binary tree where each node satisfies the following property:</p>

<ul>
	<li>Every node in the node's left subtree has a value&nbsp;<strong>strictly less</strong>&nbsp;than the node's value.</li>
	<li>Every node in the node's right subtree has a value&nbsp;<strong>strictly greater</strong>&nbsp;than the node's value.</li>
</ul>

<p>A leaf is a node that has no children.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/06/08/d1.png" style="width: 450px; height: 163px;">
<pre><strong>Input:</strong> trees = [[2,1],[3,2,5],[5,4]]
<strong>Output:</strong> [3,2,5,1,null,4]
<strong>Explanation:</strong>
In the first operation, pick i=1 and j=0, and merge trees[0] into trees[1].
Delete trees[0], so trees = [[3,2,5,1],[5,4]].
<img alt="" src="https://assets.leetcode.com/uploads/2021/06/24/diagram.png" style="width: 450px; height: 181px;">
In the second operation, pick i=0 and j=1, and merge trees[1] into trees[0].
Delete trees[1], so trees = [[3,2,5,1,null,4]].
<img alt="" src="https://assets.leetcode.com/uploads/2021/06/24/diagram-2.png" style="width: 220px; height: 165px;">
The resulting tree, shown above, is a valid BST, so return its root.</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/06/08/d2.png" style="width: 450px; height: 171px;">
<pre><strong>Input:</strong> trees = [[5,3,8],[3,2,6]]
<strong>Output:</strong> []
<strong>Explanation:</strong>
Pick i=0 and j=1 and merge trees[1] into trees[0].
Delete trees[1], so trees = [[5,3,8,2,6]].
<img alt="" src="https://assets.leetcode.com/uploads/2021/06/24/diagram-3.png" style="width: 240px; height: 196px;">
The resulting tree is shown above. This is the only valid operation that can be performed, but the resulting tree is not a valid BST, so return null.
</pre>

<p><strong class="example">Example 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/06/08/d3.png" style="width: 430px; height: 168px;">
<pre><strong>Input:</strong> trees = [[5,4],[3]]
<strong>Output:</strong> []
<strong>Explanation:</strong> It is impossible to perform any operations.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == trees.length</code></li>
	<li><code>1 &lt;= n &lt;= 5 * 10<sup>4</sup></code></li>
	<li>The number of nodes in each tree is in the range <code>[1, 3]</code>.</li>
	<li>Each node in the input may have children but no grandchildren.</li>
	<li>No two roots of <code>trees</code> have the same value.</li>
	<li>All the trees in the input are <strong>valid BSTs</strong>.</li>
	<li><code>1 &lt;= TreeNode.val &lt;= 5 * 10<sup>4</sup></code>.</li>
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
 * @param {TreeNode[]} trees
 * @return {TreeNode}
 */
const canMerge = function (trees) {
  const countMap = new Map();
  const valToNodeMap = new Map();

  const isValidBST = (node, minNode, maxNode) => {
    if (!node) return true;
    if (minNode && node.val <= minNode.val) return false;
    if (maxNode && node.val >= maxNode.val) return false;

    if (!node.left && !node.right && valToNodeMap.has(node.val)) {
      const margeNode = valToNodeMap.get(node.val);

      node.left = margeNode.left;
      node.right = margeNode.right;
      valToNodeMap.delete(node.val);
    }

    return isValidBST(node.left, minNode, node) && isValidBST(node.right, node, maxNode);
  };

  for (const tree of trees) {
    const { val, left, right } = tree;
    const count = countMap.get(val) ?? 0;

    countMap.set(val, count + 1);
    valToNodeMap.set(val, tree);

    if (left) {
      const leftValCount = countMap.get(left.val) ?? 0;

      countMap.set(left.val, leftValCount + 1);
    }

    if (right) {
      const rightValCount = countMap.get(right.val) ?? 0;

      countMap.set(right.val, rightValCount + 1);
    }
  }

  for (const tree of trees) {
    const count = countMap.get(tree.val);

    if (count > 1) continue;
    if (isValidBST(tree, null, null) && valToNodeMap.size <= 1) {
      return tree;
    }

    return null;
  }

  return null;
};
```
