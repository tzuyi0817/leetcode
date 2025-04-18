# [1617. Count Subtrees With Max Distance Between Cities](https://leetcode.com/problems/count-subtrees-with-max-distance-between-cities)

## Description

<div class="elfjS" data-track-load="description_content"><p>There are <code>n</code> cities numbered from <code>1</code> to <code>n</code>. You are given an array <code>edges</code> of size <code>n-1</code>, where <code>edges[i] = [u<sub>i</sub>, v<sub>i</sub>]</code> represents a bidirectional edge between cities <code>u<sub>i</sub></code> and <code>v<sub>i</sub></code>. There exists a unique path between each pair of cities. In other words, the cities form a <strong>tree</strong>.</p>

<p>A <strong>subtree</strong> is a subset of cities where every city is reachable from every other city in the subset, where the path between each pair passes through only the cities from the subset. Two subtrees are different if there is a city in one subtree that is not present in the other.</p>

<p>For each <code>d</code> from <code>1</code> to <code>n-1</code>, find the number of subtrees in which the <strong>maximum distance</strong> between any two cities in the subtree is equal to <code>d</code>.</p>

<p>Return <em>an array of size</em> <code>n-1</code> <em>where the </em><code>d<sup>th</sup></code><em> </em><em>element <strong>(1-indexed)</strong> is the number of subtrees in which the <strong>maximum distance</strong> between any two cities is equal to </em><code>d</code>.</p>

<p><strong>Notice</strong>&nbsp;that&nbsp;the <strong>distance</strong> between the two cities is the number of edges in the path between them.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2020/09/21/p1.png" style="width: 161px; height: 181px;"></strong></p>

<pre><strong>Input:</strong> n = 4, edges = [[1,2],[2,3],[2,4]]
<strong>Output:</strong> [3,4,0]
<strong>Explanation:
</strong>The subtrees with subsets {1,2}, {2,3} and {2,4} have a max distance of 1.
The subtrees with subsets {1,2,3}, {1,2,4}, {2,3,4} and {1,2,3,4} have a max distance of 2.
No subtree has two nodes where the max distance between them is 3.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 2, edges = [[1,2]]
<strong>Output:</strong> [1]
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> n = 3, edges = [[1,2],[2,3]]
<strong>Output:</strong> [2,1]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= n &lt;= 15</code></li>
	<li><code>edges.length == n-1</code></li>
	<li><code>edges[i].length == 2</code></li>
	<li><code>1 &lt;= u<sub>i</sub>, v<sub>i</sub> &lt;= n</code></li>
	<li>All pairs <code>(u<sub>i</sub>, v<sub>i</sub>)</code> are distinct.</li>
</ul></div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming(Floyd-Warshall's algorithm) + Bit Manipulation`**

- Time complexity: <em>O(n<sup>3</sup>+2<sup>n</sup>\*n<sup>2</sup> -> 2<sup>n</sup>\*n<sup>2</sup>)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
const countSubgraphsForEachDiameter = function (n, edges) {
  const maxMask = 1 << n;
  const dists = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(n));
  const result = Array.from({ length: n - 1 }, () => 0);

  for (let city = 1; city <= n; city++) {
    dists[city][city] = 0;
  }

  for (const [u, v] of edges) {
    dists[u][v] = 1;
    dists[v][u] = 1;
  }

  for (let k = 1; k <= n; k++) {
    for (let u = 1; u <= n; u++) {
      for (let v = 1; v <= n; v++) {
        dists[u][v] = Math.min(dists[u][v], dists[u][k] + dists[k][v]);
      }
    }
  }

  const getMaxDist = mask => {
    let maxDist = 0;
    let cityCount = 0;
    let edgeCount = 0;

    for (let u = 1; u <= n; u++) {
      if ((mask & (1 << (u - 1))) === 0) continue;

      cityCount += 1;

      for (let v = u + 1; v <= n; v++) {
        if ((mask & (1 << (v - 1))) === 0) continue;
        const dist = dists[u][v];

        if (dist === 1) edgeCount += 1;

        maxDist = Math.max(dist, maxDist);
      }
    }

    return cityCount - 1 === edgeCount ? maxDist : 0;
  };

  for (let mask = 1; mask < maxMask; mask++) {
    const maxDist = getMaxDist(mask);

    if (!maxDist) continue;

    result[maxDist - 1] += 1;
  }

  return result;
};
```
