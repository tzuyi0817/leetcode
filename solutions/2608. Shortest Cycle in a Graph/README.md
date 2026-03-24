# [2608. Shortest Cycle in a Graph](https://leetcode.com/problems/shortest-cycle-in-a-graph)

## Description

<div class="elfjS" data-track-load="description_content"><p>There is a <strong>bi-directional </strong>graph with <code>n</code> vertices, where each vertex is labeled from <code>0</code> to <code>n - 1</code>. The edges in the graph are represented by a given 2D integer array <code>edges</code>, where <code>edges[i] = [u<sub>i</sub>, v<sub>i</sub>]</code> denotes an edge between vertex <code>u<sub>i</sub></code> and vertex <code>v<sub>i</sub></code>. Every vertex pair is connected by at most one edge, and no vertex has an edge to itself.</p>

<p>Return <em>the length of the <strong>shortest </strong>cycle in the graph</em>. If no cycle exists, return <code>-1</code>.</p>

<p>A cycle is a path that starts and ends at the same node, and each edge in the path is used only once.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2023/01/04/cropped.png" style="width: 387px; height: 331px;">
<pre><strong>Input:</strong> n = 7, edges = [[0,1],[1,2],[2,0],[3,4],[4,5],[5,6],[6,3]]
<strong>Output:</strong> 3
<strong>Explanation:</strong> The cycle with the smallest length is : 0 -&gt; 1 -&gt; 2 -&gt; 0 
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2023/01/04/croppedagin.png" style="width: 307px; height: 307px;">
<pre><strong>Input:</strong> n = 4, edges = [[0,1],[0,2]]
<strong>Output:</strong> -1
<strong>Explanation:</strong> There are no cycles in this graph.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= n &lt;= 1000</code></li>
	<li><code>1 &lt;= edges.length &lt;= 1000</code></li>
	<li><code>edges[i].length == 2</code></li>
	<li><code>0 &lt;= u<sub>i</sub>, v<sub>i</sub> &lt; n</code></li>
	<li><code>u<sub>i</sub> != v<sub>i</sub></code></li>
	<li>There are no repeated edges.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Breadth-First Search`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
const findShortestCycle = function (n, edges) {
  const graph = Array.from({ length: n }, () => []);
  const MAX_LEN = n + 1;
  let result = MAX_LEN;

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const getCycleLength = startNode => {
    const dist = new Array(n).fill(-1);
    const parent = new Array(n).fill(-1);
    let queue = [startNode];
    let minCycle = MAX_LEN;

    dist[startNode] = 0;

    while (queue.length) {
      const nextQueue = [];

      for (const node of queue) {
        for (const neighbor of graph[node]) {
          if (dist[neighbor] === -1) {
            dist[neighbor] = dist[node] + 1;
            parent[neighbor] = node;
            nextQueue.push(neighbor);
          } else if (neighbor !== parent[node]) {
            const len = dist[neighbor] + dist[node] + 1;

            minCycle = Math.min(len, minCycle);
          }
        }
      }

      queue = nextQueue;
    }

    return minCycle;
  };

  for (let index = 0; index < n; index++) {
    const len = getCycleLength(index);

    if (len !== MAX_LEN) {
      result = Math.min(len, result);
    }
  }

  return result === MAX_LEN ? -1 : result;
};
```
