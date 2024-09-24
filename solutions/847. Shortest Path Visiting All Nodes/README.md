# [847. Shortest Path Visiting All Nodes](https://leetcode.com/problems/shortest-path-visiting-all-nodes)

## Description

<div class="elfjS" data-track-load="description_content"><p>You have an undirected, connected graph of <code>n</code> nodes labeled from <code>0</code> to <code>n - 1</code>. You are given an array <code>graph</code> where <code>graph[i]</code> is a list of all the nodes connected with node <code>i</code> by an edge.</p>

<p>Return <em>the length of the shortest path that visits every node</em>. You may start and stop at any node, you may revisit nodes multiple times, and you may reuse edges.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/05/12/shortest1-graph.jpg" style="width: 222px; height: 183px;">
<pre><strong>Input:</strong> graph = [[1,2,3],[0],[0],[0]]
<strong>Output:</strong> 4
<strong>Explanation:</strong> One possible path is [1,0,2,0,3]
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/05/12/shortest2-graph.jpg" style="width: 382px; height: 222px;">
<pre><strong>Input:</strong> graph = [[1],[0,2,4],[1,3,4],[2],[1,2]]
<strong>Output:</strong> 4
<strong>Explanation:</strong> One possible path is [0,1,4,2,3]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == graph.length</code></li>
	<li><code>1 &lt;= n &lt;= 12</code></li>
	<li><code>0 &lt;= graph[i].length &lt;&nbsp;n</code></li>
	<li><code>graph[i]</code> does not contain <code>i</code>.</li>
	<li>If <code>graph[a]</code> contains <code>b</code>, then <code>graph[b]</code> contains <code>a</code>.</li>
	<li>The input graph is always connected.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Breadth-First Search + Bitmask`**

- Time complexity: <em>O(n\*2<sup>n</sup>)</em>
- Space complexity: <em>O(n\*2<sup>n</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} graph
 * @return {number}
 */
const shortestPathLength = function (graph) {
  const n = graph.length;
  const fullAccess = (1 << n) - 1;
  const seen = Array(n)
    .fill('')
    .map(_ => Array(1 << n).fill(false));
  let queue = [];
  let result = 0;

  for (let index = 0; index < n; index++) {
    const visited = 1 << index;

    queue.push({ node: index, visited });
    seen[index][visited] = true;
  }

  while (queue.length) {
    const nextQueue = [];

    for (const { node, visited } of queue) {
      for (const next of graph[node]) {
        const nextVisited = visited | (1 << next);

        if (nextVisited === fullAccess) return result + 1;
        if (seen[next][nextVisited]) continue;
        nextQueue.push({ node: next, visited: nextVisited });
        seen[next][nextVisited] = true;
      }
    }
    result += 1;
    queue = nextQueue;
  }
  return 0;
};
```
