# [1557. Minimum Number of Vertices to Reach All Nodes](https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes)

## Description

<div class="xFUwe" data-track-load="description_content"><p>Given a<strong>&nbsp;directed acyclic graph</strong>,&nbsp;with&nbsp;<code>n</code>&nbsp;vertices numbered from&nbsp;<code>0</code>&nbsp;to&nbsp;<code>n-1</code>,&nbsp;and an array&nbsp;<code>edges</code>&nbsp;where&nbsp;<code>edges[i] = [from<sub>i</sub>, to<sub>i</sub>]</code>&nbsp;represents a directed edge from node&nbsp;<code>from<sub>i</sub></code>&nbsp;to node&nbsp;<code>to<sub>i</sub></code>.</p>

<p>Find <em>the smallest set of vertices from which all nodes in the graph are reachable</em>. It's guaranteed that a unique solution exists.</p>

<p>Notice that you can return the vertices in any order.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2020/07/07/untitled22.png" style="width: 231px; height: 181px;"></p>

<pre><strong>Input:</strong> n = 6, edges = [[0,1],[0,2],[2,5],[3,4],[4,2]]
<strong>Output:</strong> [0,3]
<b>Explanation: </b>It's not possible to reach all the nodes from a single vertex. From 0 we can reach [0,1,2,5]. From 3 we can reach [3,4,2,5]. So we output [0,3].</pre>

<p><strong class="example">Example 2:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2020/07/07/untitled.png" style="width: 201px; height: 201px;"></p>

<pre><strong>Input:</strong> n = 5, edges = [[0,1],[2,1],[3,1],[1,4],[2,4]]
<strong>Output:</strong> [0,2,3]
<strong>Explanation: </strong>Notice that vertices 0, 3 and 2 are not reachable from any other node, so we must include them. Also any of these vertices can reach nodes 1 and 4.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= n &lt;= 10^5</code></li>
	<li><code>1 &lt;= edges.length &lt;= min(10^5, n * (n - 1) / 2)</code></li>
	<li><code>edges[i].length == 2</code></li>
	<li><code>0 &lt;= from<sub>i,</sub>&nbsp;to<sub>i</sub> &lt; n</code></li>
	<li>All pairs <code>(from<sub>i</sub>, to<sub>i</sub>)</code> are distinct.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Graph`**

- Time complexity: <em>O(edges.length)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
const findSmallestSetOfVertices = function (n, edges) {
  const vertices = new Set(
    new Array(n)
      .fill('')
      .map((_, index) => index),
  );

  edges.forEach(([from, to]) => vertices.delete(to));

  return [...vertices];
};
```
