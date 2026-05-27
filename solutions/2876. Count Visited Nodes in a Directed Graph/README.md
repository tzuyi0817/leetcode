# [2876. Count Visited Nodes in a Directed Graph](https://leetcode.com/problems/count-visited-nodes-in-a-directed-graph)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>There is a <strong>directed</strong> graph consisting of <code>n</code> nodes numbered from <code>0</code> to <code>n - 1</code> and <code>n</code> directed edges.</p>

<p>You are given a <strong>0-indexed</strong> array <code>edges</code> where <code>edges[i]</code> indicates that there is an edge from node <code>i</code> to node <code>edges[i]</code>.</p>

<p>Consider the following process on the graph:</p>

<ul>
	<li>You start from a node <code>x</code> and keep visiting other nodes through edges until you reach a node that you have already visited before on this <strong>same</strong> process.</li>
</ul>

<p>Return <em>an array </em><code>answer</code><em> where </em><code>answer[i]</code><em> is the number of <strong>different</strong> nodes that you will visit if you perform the process starting from node </em><code>i</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2023/08/31/graaphdrawio-1.png">
<pre><strong>Input:</strong> edges = [1,2,0,0]
<strong>Output:</strong> [3,3,3,4]
<strong>Explanation:</strong> We perform the process starting from each node in the following way:
- Starting from node 0, we visit the nodes 0 -&gt; 1 -&gt; 2 -&gt; 0. The number of different nodes we visit is 3.
- Starting from node 1, we visit the nodes 1 -&gt; 2 -&gt; 0 -&gt; 1. The number of different nodes we visit is 3.
- Starting from node 2, we visit the nodes 2 -&gt; 0 -&gt; 1 -&gt; 2. The number of different nodes we visit is 3.
- Starting from node 3, we visit the nodes 3 -&gt; 0 -&gt; 1 -&gt; 2 -&gt; 0. The number of different nodes we visit is 4.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2023/08/31/graaph2drawio.png" style="width: 191px; height: 251px;">
<pre><strong>Input:</strong> edges = [1,2,3,4,0]
<strong>Output:</strong> [5,5,5,5,5]
<strong>Explanation:</strong> Starting from any node we can visit every node in the graph in the process.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == edges.length</code></li>
	<li><code>2 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= edges[i] &lt;= n - 1</code></li>
	<li><code>edges[i] != i</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Topological Sort + Depth-First Search`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} edges
 * @return {number[]}
 */
const countVisitedNodes = function (edges) {
  const n = edges.length;
  const indegrees = Array.from({ length: n }, () => 0);
  const seen = Array.from({ length: n }, () => false);
  const nonCycleNodes = [];
  const result = Array.from({ length: n }, () => 0);
  let queue = [];

  for (const node of edges) {
    indegrees[node] += 1;
  }

  for (let node = 0; node < n; node++) {
    if (!indegrees[node]) {
      queue.push(node);
    }
  }

  while (queue.length) {
    const nextQueue = [];

    for (const node of queue) {
      const neighbor = edges[node];

      indegrees[neighbor] -= 1;

      if (!indegrees[neighbor]) {
        nextQueue.push(neighbor);
      }

      nonCycleNodes.push(node);
      seen[node] = true;
    }

    queue = nextQueue;
  }

  const fillCycle = node => {
    let current = node;
    let visitedNodes = 0;

    while (!seen[current]) {
      visitedNodes += 1;
      seen[current] = true;
      current = edges[current];
    }

    result[node] = visitedNodes;
    current = edges[node];

    while (current !== node) {
      result[current] = visitedNodes;
      current = edges[current];
    }
  };

  for (let node = 0; node < n; node++) {
    if (!seen[node]) {
      fillCycle(node);
    }
  }

  for (let index = nonCycleNodes.length - 1; index >= 0; index--) {
    const node = nonCycleNodes[index];

    result[node] = result[edges[node]] + 1;
  }

  return result;
};
```
