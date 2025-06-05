# [1761. Minimum Degree of a Connected Trio in a Graph](https://leetcode.com/problems/minimum-degree-of-a-connected-trio-in-a-graph)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an undirected graph. You are given an integer <code>n</code> which is the number of nodes in the graph and an array <code>edges</code>, where each <code>edges[i] = [u<sub>i</sub>, v<sub>i</sub>]</code> indicates that there is an undirected edge between <code>u<sub>i</sub></code> and <code>v<sub>i</sub></code>.</p>

<p>A <strong>connected trio</strong> is a set of <strong>three</strong> nodes where there is an edge between <b>every</b> pair of them.</p>

<p>The <strong>degree of a connected trio</strong> is the number of edges where one endpoint is in the trio, and the other is not.</p>

<p>Return <em>the <strong>minimum</strong> degree of a connected trio in the graph, or</em> <code>-1</code> <em>if the graph has no connected trios.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/26/trios1.png" style="width: 388px; height: 164px;">
<pre><strong>Input:</strong> n = 6, edges = [[1,2],[1,3],[3,2],[4,1],[5,2],[3,6]]
<strong>Output:</strong> 3
<strong>Explanation:</strong> There is exactly one trio, which is [1,2,3]. The edges that form its degree are bolded in the figure above.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/26/trios2.png" style="width: 388px; height: 164px;">
<pre><strong>Input:</strong> n = 7, edges = [[1,3],[4,1],[4,3],[2,5],[5,6],[6,7],[7,5],[2,6]]
<strong>Output:</strong> 0
<strong>Explanation:</strong> There are exactly three trios:
1) [1,4,3] with degree 0.
2) [2,5,6] with degree 2.
3) [5,6,7] with degree 2.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= n &lt;= 400</code></li>
	<li><code>edges[i].length == 2</code></li>
	<li><code>1 &lt;= edges.length &lt;= n * (n-1) / 2</code></li>
	<li><code>1 &lt;= u<sub>i</sub>, v<sub>i</sub> &lt;= n</code></li>
	<li><code>u<sub>i </sub>!= v<sub>i</sub></code></li>
	<li>There are no repeated edges.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Brute Force`**

- Time complexity: <em>O(n<sup>3</sup>)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
const minTrioDegree = function (n, edges) {
  const indegree = Array.from({ length: n + 1 }, () => 0);
  const connected = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(false));
  let result = Number.MAX_SAFE_INTEGER;

  for (const [u, v] of edges) {
    indegree[u] += 1;
    indegree[v] += 1;
    connected[u][v] = true;
    connected[v][u] = true;
  }

  for (let u = 1; u <= n - 2; u++) {
    for (let v = u + 1; v <= n - 1; v++) {
      if (!connected[u][v]) continue;

      for (let k = v + 1; k <= n; k++) {
        if (!connected[v][k] || !connected[u][k]) continue;
        const degree = indegree[u] + indegree[v] + indegree[k] - 6;

        result = Math.min(degree, result);
      }
    }
  }

  return result === Number.MAX_SAFE_INTEGER ? -1 : result;
};
```
