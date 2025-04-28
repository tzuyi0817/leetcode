# [1489. Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree](https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a weighted undirected connected graph with <code>n</code>&nbsp;vertices numbered from <code>0</code> to <code>n - 1</code>,&nbsp;and an array <code>edges</code>&nbsp;where <code>edges[i] = [a<sub>i</sub>, b<sub>i</sub>, weight<sub>i</sub>]</code> represents a bidirectional and weighted edge between nodes&nbsp;<code>a<sub>i</sub></code>&nbsp;and <code>b<sub>i</sub></code>. A minimum spanning tree (MST) is a subset of the graph's edges that connects all vertices without cycles&nbsp;and with the minimum possible total edge weight.</p>

<p>Find <em>all the critical and pseudo-critical edges in the given graph's minimum spanning tree (MST)</em>. An MST edge whose deletion from the graph would cause the MST weight to increase is called a&nbsp;<em>critical edge</em>. On&nbsp;the other hand, a pseudo-critical edge is that which can appear in some MSTs but not all.</p>

<p>Note that you can return the indices of the edges in any order.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2020/06/04/ex1.png" style="width: 259px; height: 262px;"></p>

<pre><strong>Input:</strong> n = 5, edges = [[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]
<strong>Output:</strong> [[0,1],[2,3,4,5]]
<strong>Explanation:</strong> The figure above describes the graph.
The following figure shows all the possible MSTs:
<img alt="" src="https://assets.leetcode.com/uploads/2020/06/04/msts.png" style="width: 540px; height: 553px;">
Notice that the two edges 0 and 1 appear in all MSTs, therefore they are critical edges, so we return them in the first list of the output.
The edges 2, 3, 4, and 5 are only part of some MSTs, therefore they are considered pseudo-critical edges. We add them to the second list of the output.
</pre>

<p><strong class="example">Example 2:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2020/06/04/ex2.png" style="width: 247px; height: 253px;"></p>

<pre><strong>Input:</strong> n = 4, edges = [[0,1,1],[1,2,1],[2,3,1],[0,3,1]]
<strong>Output:</strong> [[],[0,1,2,3]]
<strong>Explanation:</strong> We can observe that since all 4 edges have equal weight, choosing any 3 edges from the given 4 will yield an MST. Therefore all 4 edges are pseudo-critical.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= n &lt;= 100</code></li>
	<li><code>1 &lt;= edges.length &lt;= min(200, n * (n - 1) / 2)</code></li>
	<li><code>edges[i].length == 3</code></li>
	<li><code>0 &lt;= a<sub>i</sub> &lt; b<sub>i</sub> &lt; n</code></li>
	<li><code>1 &lt;= weight<sub>i</sub>&nbsp;&lt;= 1000</code></li>
	<li>All pairs <code>(a<sub>i</sub>, b<sub>i</sub>)</code> are <strong>distinct</strong>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Kruskal Algorithm`**

- Time complexity: <em>O(eloge+e<sup>2</sup>)</em>
- Space complexity: <em>O(n+e)</em>
  - e: `edges.length`

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[][]}
 */
const findCriticalAndPseudoCriticalEdges = function (n, edges) {
  const group = Array.from({ length: n });
  const rank = Array.from({ length: n });

  edges = edges.map((edge, index) => [...edge, index]);
  edges.sort((a, b) => a[2] - b[2]);

  const find = node => {
    if (group[node] !== node) {
      group[node] = find(group[node]);
    }

    return group[node];
  };

  const union = (a, b) => {
    const groupA = find(a);
    const groupB = find(b);

    if (groupA === groupB) return false;

    if (rank[groupA] > rank[groupB]) {
      group[groupB] = groupA;
    } else if (rank[groupA] < rank[groupB]) {
      group[groupA] = groupB;
    } else {
      group[groupB] = groupA;
      rank[groupA] += 1;
    }

    return true;
  };

  const restUnion = () => {
    for (let node = 0; node < n; node++) {
      group[node] = node;
      rank[node] = 0;
    }
  };

  const getMSTWeight = (deleteIndex = -1, outset) => {
    let mstWeight = 0;
    let useEdges = 0;

    restUnion();

    if (outset) {
      const [a, b, weight] = outset;

      union(a, b);
      mstWeight += weight;
      useEdges += 1;
    }

    for (const [a, b, weight, index] of edges) {
      if (deleteIndex === index || !union(a, b)) continue;

      mstWeight += weight;
      useEdges += 1;
    }

    return useEdges === n - 1 ? mstWeight : Number.MAX_SAFE_INTEGER;
  };

  const criticalEdges = [];
  const pseudoCriticalEdges = [];
  const mstWeight = getMSTWeight();

  for (const edge of edges) {
    const index = edge[3];

    if (getMSTWeight(index) > mstWeight) {
      criticalEdges.push(index);
    } else if (getMSTWeight(-1, edge) === mstWeight) {
      pseudoCriticalEdges.push(index);
    }
  }

  return [criticalEdges, pseudoCriticalEdges];
};
```
