# [3650. Minimum Cost Path with Edge Reversals](https://leetcode.com/problems/minimum-cost-path-with-edge-reversals)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a directed, weighted graph with <code>n</code> nodes labeled from 0 to <code>n - 1</code>, and an array <code>edges</code> where <code>edges[i] = [u<sub>i</sub>, v<sub>i</sub>, w<sub>i</sub>]</code> represents a directed edge from node <code>u<sub>i</sub></code> to node <code>v<sub>i</sub></code> with cost <code>w<sub>i</sub></code>.</p>

<p>Each node <code>u<sub>i</sub></code> has a switch that can be used <strong>at most once</strong>: when you arrive at <code>u<sub>i</sub></code> and have not yet used its switch, you may activate it on one of its incoming edges <code>v<sub>i</sub> → u<sub>i</sub></code> reverse that edge to <code>u<sub>i</sub> → v<sub>i</sub></code> and <strong>immediately</strong> traverse it.</p>

<p>The reversal is only valid for that single move, and using a reversed edge costs <code>2 * w<sub>i</sub></code>.</p>

<p>Return the <strong>minimum</strong> total cost to travel from node 0 to node <code>n - 1</code>. If it is not possible, return -1.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">n = 4, edges = [[0,1,3],[3,1,1],[2,3,4],[0,2,2]]</span></p>

<p><strong>Output:</strong> <span class="example-io">5</span></p>

<p><strong>Explanation: </strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2025/05/07/e1drawio.png" style="width: 171px; height: 111px;"></strong></p>

<ul>
	<li>Use the path <code>0 → 1</code> (cost 3).</li>
	<li>At node 1 reverse the original edge <code>3 → 1</code> into <code>1 → 3</code> and traverse it at cost <code>2 * 1 = 2</code>.</li>
	<li>Total cost is <code>3 + 2 = 5</code>.</li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">n = 4, edges = [[0,2,1],[2,1,1],[1,3,1],[2,3,3]]</span></p>

<p><strong>Output:</strong> <span class="example-io">3</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>No reversal is needed. Take the path <code>0 → 2</code> (cost 1), then <code>2 → 1</code> (cost 1), then <code>1 → 3</code> (cost 1).</li>
	<li>Total cost is <code>1 + 1 + 1 = 3</code>.</li>
</ul>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= n &lt;= 5 * 10<sup>4</sup></code></li>
	<li><code>1 &lt;= edges.length &lt;= 10<sup>5</sup></code></li>
	<li><code>edges[i] = [u<sub>i</sub>, v<sub>i</sub>, w<sub>i</sub>]</code></li>
	<li><code>0 &lt;= u<sub>i</sub>, v<sub>i</sub> &lt;= n - 1</code></li>
	<li><code>1 &lt;= w<sub>i</sub> &lt;= 1000</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dijkstra's Algorithm`**

- Time complexity: <em>O(n+mlogm)</em>
- Space complexity: <em>O(n+m)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
const minCost = function (n, edges) {
  const graph = Array.from({ length: n }, () => []);
  const dist = Array.from({ length: n }, () => Number.MAX_SAFE_INTEGER);
  const visited = Array.from({ length: n }, () => false);
  const minHeap = new MinPriorityQueue(({ cost }) => cost);

  for (const [u, v, cost] of edges) {
    graph[u].push({ node: v, cost });
    graph[v].push({ node: u, cost: cost * 2 });
  }

  dist[0] = 0;
  minHeap.enqueue({ node: 0, cost: 0 });

  while (minHeap.size()) {
    const { node, cost } = minHeap.dequeue();

    if (visited[node]) continue;
    if (node === n - 1) return cost;

    visited[node] = true;

    for (const neighbor of graph[node]) {
      const totalCost = cost + neighbor.cost;

      if (totalCost >= dist[neighbor.node]) continue;

      dist[neighbor.node] = totalCost;
      minHeap.enqueue({ node: neighbor.node, cost: totalCost });
    }
  }

  return -1;
};
```
