# [1514. Path with Maximum Probability](https://leetcode.com/problems/path-with-maximum-probability)

## Description

<div class="xFUwe" data-track-load="description_content"><p>You are given an undirected weighted graph of&nbsp;<code>n</code>&nbsp;nodes (0-indexed), represented by an edge list where&nbsp;<code>edges[i] = [a, b]</code>&nbsp;is an undirected edge connecting the nodes&nbsp;<code>a</code>&nbsp;and&nbsp;<code>b</code>&nbsp;with a probability of success of traversing that edge&nbsp;<code>succProb[i]</code>.</p>

<p>Given two nodes&nbsp;<code>start</code>&nbsp;and&nbsp;<code>end</code>, find the path with the maximum probability of success to go from&nbsp;<code>start</code>&nbsp;to&nbsp;<code>end</code>&nbsp;and return its success probability.</p>

<p>If there is no path from&nbsp;<code>start</code>&nbsp;to&nbsp;<code>end</code>, <strong>return&nbsp;0</strong>. Your answer will be accepted if it differs from the correct answer by at most <strong>1e-5</strong>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2019/09/20/1558_ex1.png" style="width: 187px; height: 186px;"></strong></p>

<pre><strong>Input:</strong> n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2
<strong>Output:</strong> 0.25000
<strong>Explanation:</strong>&nbsp;There are two paths from start to end, one having a probability of success = 0.2 and the other has 0.5 * 0.5 = 0.25.
</pre>

<p><strong class="example">Example 2:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2019/09/20/1558_ex2.png" style="width: 189px; height: 186px;"></strong></p>

<pre><strong>Input:</strong> n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2
<strong>Output:</strong> 0.30000
</pre>

<p><strong class="example">Example 3:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2019/09/20/1558_ex3.png" style="width: 215px; height: 191px;"></strong></p>

<pre><strong>Input:</strong> n = 3, edges = [[0,1]], succProb = [0.5], start = 0, end = 2
<strong>Output:</strong> 0.00000
<strong>Explanation:</strong>&nbsp;There is no path between 0 and 2.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= n &lt;= 10^4</code></li>
	<li><code>0 &lt;= start, end &lt; n</code></li>
	<li><code>start != end</code></li>
	<li><code>0 &lt;= a, b &lt; n</code></li>
	<li><code>a != b</code></li>
	<li><code>0 &lt;= succProb.length == edges.length &lt;= 2*10^4</code></li>
	<li><code>0 &lt;= succProb[i] &lt;= 1</code></li>
	<li>There is at most one edge between every two nodes.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dijkstra's Algorithm`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} succProb
 * @param {number} start_node
 * @param {number} end_node
 * @return {number}
 */
const maxProbability = function (n, edges, succProb, start_node, end_node) {
  const graph = new Array(n)
    .fill('')
    .map(_ => []);
  const probs = new Array(n).fill(0);
  const queue = new MaxPriorityQueue({ priority: ({ prob }) => prob });

  for (const [index, [a, b]] of edges.entries()) {

    graph[a].push({ node: b, prob: succProb[index] });
    graph[b].push({ node: a, prob: succProb[index] });
  }
  probs[start_node] = 1;
  queue.enqueue({ node: start_node, prob: 1 });

  while (queue.size()) {
    const { node, prob } = queue.dequeue().element;

    for (const arrive of graph[node]) {
      const nextProb = arrive.prob * prob;

      if (nextProb <= probs[arrive.node]) continue;
      probs[arrive.node] = nextProb;
      queue.enqueue({ node: arrive.node, prob: nextProb });
    }
  }
  return probs[end_node];
};
```
