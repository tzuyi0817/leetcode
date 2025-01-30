# [2493. Divide Nodes Into the Maximum Number of Groups](https://leetcode.com/problems/divide-nodes-into-the-maximum-number-of-groups)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a positive integer <code>n</code> representing the number of nodes in an <strong>undirected</strong> graph. The nodes are labeled from <code>1</code> to <code>n</code>.</p>

<p>You are also given a 2D integer array <code>edges</code>, where <code>edges[i] = [a<sub>i, </sub>b<sub>i</sub>]</code> indicates that there is a <strong>bidirectional</strong> edge between nodes <code>a<sub>i</sub></code> and <code>b<sub>i</sub></code>. <strong>Notice</strong> that the given graph may be disconnected.</p>

<p>Divide the nodes of the graph into <code>m</code> groups (<strong>1-indexed</strong>) such that:</p>

<ul>
	<li>Each node in the graph belongs to exactly one group.</li>
	<li>For every pair of nodes in the graph that are connected by an edge <code>[a<sub>i, </sub>b<sub>i</sub>]</code>, if <code>a<sub>i</sub></code> belongs to the group with index <code>x</code>, and <code>b<sub>i</sub></code> belongs to the group with index <code>y</code>, then <code>|y - x| = 1</code>.</li>
</ul>

<p>Return <em>the maximum number of groups (i.e., maximum </em><code>m</code><em>) into which you can divide the nodes</em>. Return <code>-1</code> <em>if it is impossible to group the nodes with the given conditions</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/10/13/example1.png" style="width: 352px; height: 201px;">
<pre><strong>Input:</strong> n = 6, edges = [[1,2],[1,4],[1,5],[2,6],[2,3],[4,6]]
<strong>Output:</strong> 4
<strong>Explanation:</strong> As shown in the image we:
- Add node 5 to the first group.
- Add node 1 to the second group.
- Add nodes 2 and 4 to the third group.
- Add nodes 3 and 6 to the fourth group.
We can see that every edge is satisfied.
It can be shown that that if we create a fifth group and move any node from the third or fourth group to it, at least on of the edges will not be satisfied.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 3, edges = [[1,2],[2,3],[3,1]]
<strong>Output:</strong> -1
<strong>Explanation:</strong> If we add node 1 to the first group, node 2 to the second group, and node 3 to the third group to satisfy the first two edges, we can see that the third edge will not be satisfied.
It can be shown that no grouping is possible.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 500</code></li>
	<li><code>1 &lt;= edges.length &lt;= 10<sup>4</sup></code></li>
	<li><code>edges[i].length == 2</code></li>
	<li><code>1 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt;= n</code></li>
	<li><code>a<sub>i</sub> != b<sub>i</sub></code></li>
	<li>There is at most one edge between any pair of vertices.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Union Find + Breadth-First Search`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
const magnificentSets = function (n, edges) {
  const graph = Array.from({ length: n + 1 }, () => []);
  const groups = Array.from({ length: n + 1 }, (_, index) => index);
  const ranks = Array.from({ length: n + 1 }, () => 0);

  const find = node => {
    const group = groups[node];

    return group === node ? node : find(group);
  };

  const union = (a, b) => {
    const x = find(a);
    const y = find(b);

    if (x === y) return;
    if (ranks[x] > ranks[y]) {
      groups[y] = x;
    } else if (ranks[y] > ranks[x]) {
      groups[x] = y;
    } else {
      groups[y] = x;
      ranks[x] += 1;
    }
  };

  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
    union(a, b);
  }

  const getGroupSize = node => {
    const stepMap = new Map();
    let queue = [node];
    let step = 0;

    stepMap.set(node, 0);

    while (queue.length) {
      const nextQueue = [];

      for (const nextNode of queue) {
        for (const neighbor of graph[nextNode]) {
          if (stepMap.has(neighbor)) {
            if (stepMap.get(neighbor) === step) return -1;
          } else {
            nextQueue.push(neighbor);
            stepMap.set(neighbor, step + 1);
          }
        }
      }
      step += 1;
      queue = nextQueue;
    }
    return step;
  };

  const groupNodes = Array.from({ length: n + 1 }, () => []);
  let result = 0;

  for (let node = 1; node <= n; node++) {
    const group = find(node);

    groupNodes[group].push(node);
  }

  for (const nodes of groupNodes) {
    let maxGroupSize = 0;

    for (const node of nodes) {
      const groupSize = getGroupSize(node);

      if (groupSize === -1) return -1;

      maxGroupSize = Math.max(groupSize, maxGroupSize);
    }
    result += maxGroupSize;
  }
  return result;
};
```
