# [1719. Number Of Ways To Reconstruct A Tree](https://leetcode.com/problems/number-of-ways-to-reconstruct-a-tree)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an array <code>pairs</code>, where <code>pairs[i] = [x<sub>i</sub>, y<sub>i</sub>]</code>, and:</p>

<ul>
	<li>There are no duplicates.</li>
	<li><code>x<sub>i</sub> &lt; y<sub>i</sub></code></li>
</ul>

<p>Let <code>ways</code> be the number of rooted trees that satisfy the following conditions:</p>

<ul>
	<li>The tree consists of nodes whose values appeared in <code>pairs</code>.</li>
	<li>A pair <code>[x<sub>i</sub>, y<sub>i</sub>]</code> exists in <code>pairs</code> <strong>if and only if</strong> <code>x<sub>i</sub></code> is an ancestor of <code>y<sub>i</sub></code> or <code>y<sub>i</sub></code> is an ancestor of <code>x<sub>i</sub></code>.</li>
	<li><strong>Note:</strong> the tree does not have to be a binary tree.</li>
</ul>

<p>Two ways are considered to be different if there is at least one node that has different parents in both ways.</p>

<p>Return:</p>

<ul>
	<li><code>0</code> if <code>ways == 0</code></li>
	<li><code>1</code> if <code>ways == 1</code></li>
	<li><code>2</code> if <code>ways &gt; 1</code></li>
</ul>

<p>A <strong>rooted tree</strong> is a tree that has a single root node, and all edges are oriented to be outgoing from the root.</p>

<p>An <strong>ancestor</strong> of a node is any node on the path from the root to that node (excluding the node itself). The root has no ancestors.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img src="https://assets.leetcode.com/uploads/2020/12/03/trees2.png" style="width: 208px; height: 221px;">
<pre><strong>Input:</strong> pairs = [[1,2],[2,3]]
<strong>Output:</strong> 1
<strong>Explanation:</strong> There is exactly one valid rooted tree, which is shown in the above figure.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/03/tree.png" style="width: 234px; height: 241px;">
<pre><strong>Input:</strong> pairs = [[1,2],[2,3],[1,3]]
<strong>Output:</strong> 2
<strong>Explanation:</strong> There are multiple valid rooted trees. Three of them are shown in the above figures.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> pairs = [[1,2],[2,3],[2,4],[1,5]]
<strong>Output:</strong> 0
<strong>Explanation:</strong> There are no valid rooted trees.</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= pairs.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= x<sub>i </sub>&lt; y<sub>i</sub> &lt;= 500</code></li>
	<li>The elements in <code>pairs</code> are unique.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Depth-First Search`**

- Time complexity: <em>O(n+m<sup>2</sup>logm)</em>
- Space complexity: <em>O(m<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} pairs
 * @return {number}
 */
const checkWays = function (pairs) {
  const graph = new Map();

  for (const [x, y] of pairs) {
    if (!graph.has(x)) graph.set(x, []);
    if (!graph.has(y)) graph.set(y, []);

    graph.get(x).push(y);
    graph.get(y).push(x);
  }

  const m = Math.max(...graph.keys());
  const indegree = Array.from({ length: m + 1 }, () => 0);
  const connected = Array.from({ length: m + 1 }, () => {
    return Array.from({ length: m + 1 }, () => false);
  });

  for (const [x, y] of pairs) {
    indegree[x] += 1;
    indegree[y] += 1;
    connected[x][y] = true;
    connected[y][x] = true;
  }

  const root = indegree.indexOf(graph.size - 1);

  if (root === -1) return 0;
  const visited = Array.from({ length: m + 1 }, () => false);
  const ancestors = [];
  let multipleWays = false;

  for (const nodes of graph.values()) {
    nodes.sort((a, b) => indegree[b] - indegree[a]);
  }

  const isReconstructTree = node => {
    const isConnected = ancestors.every(ancestor => connected[ancestor][node]);

    visited[node] = true;

    if (!isConnected) return false;

    ancestors.push(node);

    for (const neighbor of graph.get(node)) {
      if (visited[neighbor]) continue;
      if (indegree[node] === indegree[neighbor]) {
        multipleWays = true;
      }
      if (!isReconstructTree(neighbor)) return false;
    }

    ancestors.pop();

    return true;
  };

  if (!isReconstructTree(root)) return 0;

  return multipleWays ? 2 : 1;
};
```
