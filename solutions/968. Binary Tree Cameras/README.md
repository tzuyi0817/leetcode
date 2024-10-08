# [968. Binary Tree Cameras](https://leetcode.com/problems/binary-tree-cameras)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given the <code>root</code> of a binary tree. We install cameras on the tree nodes where each camera at a node can monitor its parent, itself, and its immediate children.</p>

<p>Return <em>the minimum number of cameras needed to monitor all nodes of the tree</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2018/12/29/bst_cameras_01.png" style="width: 138px; height: 163px;">
<pre><strong>Input:</strong> root = [0,0,null,0,0]
<strong>Output:</strong> 1
<strong>Explanation:</strong> One camera is enough to monitor all nodes if placed as shown.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2018/12/29/bst_cameras_02.png" style="width: 139px; height: 312px;">
<pre><strong>Input:</strong> root = [0,0,null,0,null,0,null,null,0]
<strong>Output:</strong> 2
<strong>Explanation:</strong> At least two cameras are needed to monitor all nodes of the tree. The above image shows one of the valid configurations of camera placement.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li>The number of nodes in the tree is in the range <code>[1, 1000]</code>.</li>
	<li><code>Node.val == 0</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy + Depth-First Search`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(h)</em>

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
 * @param {TreeNode} root
 * @return {number}
 */
const minCameraCover = function (root) {
  const LEAF = 0;
  const CAMERA = 1;
  const PARENT = 2;
  let result = 0;

  const setupCamera = node => {
    if (!node) return PARENT;
    const left = setupCamera(node.left);
    const right = setupCamera(node.right);

    if (left === LEAF || right === LEAF) {
      result += 1;
      return CAMERA;
    }
    return left === CAMERA || right === CAMERA ? PARENT : LEAF;
  };

  const node = setupCamera(root);

  return result + (node === LEAF ? 1 : 0);
};
```
