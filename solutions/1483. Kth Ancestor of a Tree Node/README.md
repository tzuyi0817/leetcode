# [1483. Kth Ancestor of a Tree Node](https://leetcode.com/problems/kth-ancestor-of-a-tree-node)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a tree with <code>n</code> nodes numbered from <code>0</code> to <code>n - 1</code> in the form of a parent array <code>parent</code> where <code>parent[i]</code> is the parent of <code>i<sup>th</sup></code> node. The root of the tree is node <code>0</code>. Find the <code>k<sup>th</sup></code> ancestor of a given node.</p>

<p>The <code>k<sup>th</sup></code> ancestor of a tree node is the <code>k<sup>th</sup></code> node in the path from that node to the root node.</p>

<p>Implement the <code>TreeAncestor</code> class:</p>

<ul>
	<li><code>TreeAncestor(int n, int[] parent)</code> Initializes the object with the number of nodes in the tree and the parent array.</li>
	<li><code>int getKthAncestor(int node, int k)</code> return the <code>k<sup>th</sup></code> ancestor of the given node <code>node</code>. If there is no such ancestor, return <code>-1</code>.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2019/08/28/1528_ex1.png" style="width: 396px; height: 262px;">
<pre><strong>Input</strong>
["TreeAncestor", "getKthAncestor", "getKthAncestor", "getKthAncestor"]
<p>[[7, [-1, 0, 0, 1, 1, 2, 2]], [3, 1], [5, 2], [6, 3]]</p><strong>Output</strong>
<p>[null, 1, 0, -1]</p><strong>Explanation</strong>
TreeAncestor treeAncestor = new TreeAncestor(7, [-1, 0, 0, 1, 1, 2, 2]);
treeAncestor.getKthAncestor(3, 1); // returns 1 which is the parent of 3
treeAncestor.getKthAncestor(5, 2); // returns 0 which is the grandparent of 5
treeAncestor.getKthAncestor(6, 3); // returns -1 because there is no such ancestor</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= k &lt;= n &lt;= 5 * 10<sup>4</sup></code></li>
	<li><code>parent.length == n</code></li>
	<li><code>parent[0] == -1</code></li>
	<li><code>0 &lt;= parent[i] &lt; n</code> for all <code>0 &lt; i &lt; n</code></li>
	<li><code>0 &lt;= node &lt; n</code></li>
	<li>There will be at most <code>5 * 10<sup>4</sup></code> queries.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Binary Lifting`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(nlogn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number[]} parent
 */
const TreeAncestor = function (n, parent) {
  const maxDepth = Math.ceil(Math.log2(n));
  const dp = Array.from({ length: n }, () => new Array(maxDepth).fill(-1));

  for (let node = 0; node < n; node++) {
    dp[node][0] = parent[node];
  }

  for (let depth = 1; depth < maxDepth; depth++) {
    for (let node = 0; node < n; node++) {
      const ancestor = dp[node][depth - 1];

      if (ancestor === -1) continue;

      dp[node][depth] = dp[ancestor][depth - 1];
    }
  }

  this.maxDepth = maxDepth;
  this.dp = dp;
};

/**
 * @param {number} node
 * @param {number} k
 * @return {number}
 */
TreeAncestor.prototype.getKthAncestor = function (node, k) {
  let result = node;

  for (let depth = 0; depth < this.maxDepth; depth++) {
    if ((k >> depth) & 1) {
      result = this.dp[result][depth];
    }
    if (result === -1) return -1;
  }

  return result === node ? -1 : result;
};

/**
 * Your TreeAncestor object will be instantiated and called as such:
 * var obj = new TreeAncestor(n, parent)
 * var param_1 = obj.getKthAncestor(node,k)
 */
```
