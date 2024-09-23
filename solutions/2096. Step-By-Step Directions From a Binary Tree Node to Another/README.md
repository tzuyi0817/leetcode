# [2096. Step-By-Step Directions From a Binary Tree Node to Another](https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given the <code>root</code> of a <strong>binary tree</strong> with <code>n</code> nodes. Each node is uniquely assigned a value from <code>1</code> to <code>n</code>. You are also given an integer <code>startValue</code> representing the value of the start node <code>s</code>, and a different integer <code>destValue</code> representing the value of the destination node <code>t</code>.</p>

<p>Find the <strong>shortest path</strong> starting from node <code>s</code> and ending at node <code>t</code>. Generate step-by-step directions of such path as a string consisting of only the <strong>uppercase</strong> letters <code>'L'</code>, <code>'R'</code>, and <code>'U'</code>. Each letter indicates a specific direction:</p>

<ul>
	<li><code>'L'</code> means to go from a node to its <strong>left child</strong> node.</li>
	<li><code>'R'</code> means to go from a node to its <strong>right child</strong> node.</li>
	<li><code>'U'</code> means to go from a node to its <strong>parent</strong> node.</li>
</ul>

<p>Return <em>the step-by-step directions of the <strong>shortest path</strong> from node </em><code>s</code><em> to node</em> <code>t</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/11/15/eg1.png" style="width: 214px; height: 163px;">
<pre><strong>Input:</strong> root = [5,1,2,3,null,6,4], startValue = 3, destValue = 6
<strong>Output:</strong> "UURL"
<strong>Explanation:</strong> The shortest path is: 3 → 1 → 5 → 2 → 6.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/11/15/eg2.png" style="width: 74px; height: 102px;">
<pre><strong>Input:</strong> root = [2,1], startValue = 2, destValue = 1
<strong>Output:</strong> "L"
<strong>Explanation:</strong> The shortest path is: 2 → 1.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li>The number of nodes in the tree is <code>n</code>.</li>
	<li><code>2 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= Node.val &lt;= n</code></li>
	<li>All the values in the tree are <strong>unique</strong>.</li>
	<li><code>1 &lt;= startValue, destValue &lt;= n</code></li>
	<li><code>startValue != destValue</code></li>
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
 * @param {TreeNode} root
 * @param {number} startValue
 * @param {number} destValue
 * @return {string}
 */
var getDirections = function(root, startValue, destValue) {
    const getStepPath = (node, target, path = '') => {
        if (!node) return '';
        if (node.val === target) return path;

        const { left, right } = node;
        const leftPath = getStepPath(left, target, `${path}L`);

        if (leftPath) return leftPath;
        return getStepPath(right, target, `${path}R`);
    };

    const startPath = getStepPath(root, startValue);
    const endPath = getStepPath(root, destValue);
    let start = 0;

    while (startPath[start] === endPath[start]) start += 1;

    return 'U'.repeat(startPath.length - start) + endPath.slice(start);
};
```
