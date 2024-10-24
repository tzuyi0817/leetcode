# [951. Flip Equivalent Binary Trees](https://leetcode.com/problems/flip-equivalent-binary-trees)

## Description

<div class="elfjS" data-track-load="description_content"><p>For a binary tree <strong>T</strong>, we can define a <strong>flip operation</strong> as follows: choose any node, and swap the left and right child subtrees.</p>

<p>A binary tree <strong>X</strong>&nbsp;is <em>flip equivalent</em> to a binary tree <strong>Y</strong> if and only if we can make <strong>X</strong> equal to <strong>Y</strong> after some number of flip operations.</p>

<p>Given the roots of two binary trees <code>root1</code> and <code>root2</code>, return <code>true</code> if the two trees are flip equivalent or <code>false</code> otherwise.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="Flipped Trees Diagram" src="https://assets.leetcode.com/uploads/2018/11/29/tree_ex.png" style="width: 500px; height: 220px;">
<pre><strong>Input:</strong> root1 = [1,2,3,4,5,6,null,null,null,7,8], root2 = [1,3,2,null,6,4,5,null,null,null,null,8,7]
<strong>Output:</strong> true
<strong>Explanation: </strong>We flipped at nodes with values 1, 3, and 5.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> root1 = [], root2 = []
<strong>Output:</strong> true
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> root1 = [], root2 = [1]
<strong>Output:</strong> false
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li>The number of nodes in each tree is in the range <code>[0, 100]</code>.</li>
	<li>Each tree will have <strong>unique node values</strong> in the range <code>[0, 99]</code>.</li>
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
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
const flipEquiv = function (root1, root2) {
  const flipToEquivalentTree = (node1, node2) => {
    if (!node1 && !node2) return true;
    if (!node1 || !node2) return false;
    if (node1.val !== node2.val) return false;

    const { left, right } = node1;

    if (left?.val !== node2.left?.val) {
      node1.right = left;
      node1.left = right;
    }
    const isLeftEquivalent = flipToEquivalentTree(node1.left, node2.left);
    const isRightEquivalent = flipToEquivalentTree(node1.right, node2.right);

    return isLeftEquivalent && isRightEquivalent;
  };

  return flipToEquivalentTree(root1, root2);
};
```
