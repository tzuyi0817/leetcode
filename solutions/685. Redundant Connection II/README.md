# [685. Redundant Connection II](https://leetcode.com/problems/redundant-connection-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>In this problem, a rooted tree is a <b>directed</b> graph such that, there is exactly one node (the root) for which all other nodes are descendants of this node, plus every node has exactly one parent, except for the root node which has no parents.</p>

<p>The given input is a directed graph that started as a rooted tree with <code>n</code> nodes (with distinct values from <code>1</code> to <code>n</code>), with one additional directed edge added. The added edge has two different vertices chosen from <code>1</code> to <code>n</code>, and was not an edge that already existed.</p>

<p>The resulting graph is given as a 2D-array of <code>edges</code>. Each element of <code>edges</code> is a pair <code>[u<sub>i</sub>, v<sub>i</sub>]</code> that represents a <b>directed</b> edge connecting nodes <code>u<sub>i</sub></code> and <code>v<sub>i</sub></code>, where <code>u<sub>i</sub></code> is a parent of child <code>v<sub>i</sub></code>.</p>

<p>Return <em>an edge that can be removed so that the resulting graph is a rooted tree of</em> <code>n</code> <em>nodes</em>. If there are multiple answers, return the answer that occurs last in the given 2D-array.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/20/graph1.jpg" style="width: 222px; height: 222px;">
<pre><strong>Input:</strong> edges = [[1,2],[1,3],[2,3]]
<strong>Output:</strong> [2,3]
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/20/graph2.jpg" style="width: 222px; height: 382px;">
<pre><strong>Input:</strong> edges = [[1,2],[2,3],[3,4],[4,1],[1,5]]
<strong>Output:</strong> [4,1]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == edges.length</code></li>
	<li><code>3 &lt;= n &lt;= 1000</code></li>
	<li><code>edges[i].length == 2</code></li>
	<li><code>1 &lt;= u<sub>i</sub>, v<sub>i</sub> &lt;= n</code></li>
	<li><code>u<sub>i</sub> != v<sub>i</sub></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Union Find`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} edges
 * @return {number[]}
 */
const findRedundantDirectedConnection = function (edges) {
  const graph = new Map();
  let firstEntrance = null;
  let secondEntrance = null;

  for (const edge of edges) {
    const [parent, child] = edge;

    if (graph.has(child)) {
      firstEntrance = [graph.get(child), child];
      secondEntrance = [parent, child];
      edge[1] = 0;
      continue;
    }
    graph.set(child, parent);
  }

  const unionFind = node => {
    if (!graph.has(node)) return node;
    return unionFind(graph.get(node));
  };

  graph.clear();

  for (const [parent, child] of edges) {
    const from = unionFind(parent);
    const to = unionFind(child);

    if (from === to) return firstEntrance ?? [parent, child];
    graph.set(to, from);
  }
  return secondEntrance;
};
```
