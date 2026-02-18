# [2508. Add Edges to Make Degrees of All Nodes Even](https://leetcode.com/problems/add-edges-to-make-degrees-of-all-nodes-even)

## Description

<div class="elfjS" data-track-load="description_content"><p>There is an <strong>undirected</strong> graph consisting of <code>n</code> nodes numbered from <code>1</code> to <code>n</code>. You are given the integer <code>n</code> and a <strong>2D</strong> array <code>edges</code> where <code>edges[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> indicates that there is an edge between nodes <code>a<sub>i</sub></code> and <code>b<sub>i</sub></code>. The graph can be disconnected.</p>

<p>You can add <strong>at most</strong> two additional edges (possibly none) to this graph so that there are no repeated edges and no self-loops.</p>

<p>Return <code>true</code><em> if it is possible to make the degree of each node in the graph even, otherwise return </em><code>false</code><em>.</em></p>

<p>The degree of a node is the number of edges connected to it.</p>

<p>&nbsp;</p>
<p><strong>Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/10/26/agraphdrawio.png" style="width: 500px; height: 190px;">
<pre><strong>Input:</strong> n = 5, edges = [[1,2],[2,3],[3,4],[4,2],[1,4],[2,5]]
<strong>Output:</strong> true
<strong>Explanation:</strong> The above diagram shows a valid way of adding an edge.
Every node in the resulting graph is connected to an even number of edges.
</pre>

<p><strong>Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/10/26/aagraphdrawio.png" style="width: 400px; height: 120px;">
<pre><strong>Input:</strong> n = 4, edges = [[1,2],[3,4]]
<strong>Output:</strong> true
<strong>Explanation:</strong> The above diagram shows a valid way of adding two edges.</pre>

<p><strong>Example 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/10/26/aaagraphdrawio.png" style="width: 150px; height: 158px;">
<pre><strong>Input:</strong> n = 4, edges = [[1,2],[1,3],[1,4]]
<strong>Output:</strong> false
<strong>Explanation:</strong> It is not possible to obtain a valid graph with adding at most 2 edges.</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>3 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>2 &lt;= edges.length &lt;= 10<sup>5</sup></code></li>
	<li><code>edges[i].length == 2</code></li>
	<li><code>1 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt;= n</code></li>
	<li><code>a<sub>i</sub> != b<sub>i</sub></code></li>
	<li>There are no repeated edges.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Table`**

- Time complexity: <em>O(n+edges.length)</em>
- Space complexity: <em>O(n+edges.length)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
const isPossible = function (n, edges) {
  const graph = Array.from({ length: n }, () => []);
  const oddNodes = [];

  for (const [u, v] of edges) {
    const a = u - 1;
    const b = v - 1;

    graph[a].push(b);
    graph[b].push(a);
  }

  for (let node = 0; node < n; node++) {
    if (graph[node].length % 2) {
      oddNodes.push(node);
    }
  }

  if (oddNodes.length === 0) return true;

  if (oddNodes.length === 2) {
    const [a, b] = oddNodes;

    if (!graph[a].includes(b)) return true;

    for (let node = 0; node < n; node++) {
      if (node === a || node === b) continue;

      if (!graph[node].includes(a) && !graph[node].includes(b)) {
        return true;
      }
    }
  }

  if (oddNodes.length === 4) {
    const [a, b, c, d] = oddNodes;

    if (!graph[a].includes(b) && !graph[c].includes(d)) return true;
    if (!graph[a].includes(c) && !graph[b].includes(d)) return true;
    if (!graph[a].includes(d) && !graph[b].includes(c)) return true;
  }

  return false;
};
```
