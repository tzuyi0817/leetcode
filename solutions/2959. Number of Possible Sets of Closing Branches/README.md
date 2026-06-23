# [2959. Number of Possible Sets of Closing Branches](https://leetcode.com/problems/number-of-possible-sets-of-closing-branches)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>There is a company with <code>n</code> branches across the country, some of which are connected by roads. Initially, all branches are reachable from each other by traveling some roads.</p>

<p>The company has realized that they are spending an excessive amount of time traveling between their branches. As a result, they have decided to close down some of these branches (<strong>possibly none</strong>). However, they want to ensure that the remaining branches have a distance of at most <code>maxDistance</code> from each other.</p>

<p>The <strong>distance</strong> between two branches is the <strong>minimum</strong> total traveled length needed to reach one branch from another.</p>

<p>You are given integers <code>n</code>, <code>maxDistance</code>, and a <strong>0-indexed</strong> 2D array <code>roads</code>, where <code>roads[i] = [u<sub>i</sub>, v<sub>i</sub>, w<sub>i</sub>]</code> represents the <strong>undirected</strong> road between branches <code>u<sub>i</sub></code> and <code>v<sub>i</sub></code> with length <code>w<sub>i</sub></code>.</p>

<p>Return <em>the number of possible sets of closing branches, so that any branch has a distance of at most </em><code>maxDistance</code><em> from any other</em>.</p>

<p><strong>Note</strong> that, after closing a branch, the company will no longer have access to any roads connected to it.</p>

<p><strong>Note</strong> that, multiple roads are allowed.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2023/11/08/example11.png" style="width: 221px; height: 191px;">
<pre><strong>Input:</strong> n = 3, maxDistance = 5, roads = [[0,1,2],[1,2,10],[0,2,10]]
<strong>Output:</strong> 5
<strong>Explanation:</strong> The possible sets of closing branches are:
- The set [2], after closing, active branches are [0,1] and they are reachable to each other within distance 2.
- The set [0,1], after closing, the active branch is [2].
- The set [1,2], after closing, the active branch is [0].
- The set [0,2], after closing, the active branch is [1].
- The set [0,1,2], after closing, there are no active branches.
It can be proven, that there are only 5 possible sets of closing branches.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2023/11/08/example22.png" style="width: 221px; height: 241px;">
<pre><strong>Input:</strong> n = 3, maxDistance = 5, roads = [[0,1,20],[0,1,10],[1,2,2],[0,2,2]]
<strong>Output:</strong> 7
<strong>Explanation:</strong> The possible sets of closing branches are:
- The set [], after closing, active branches are [0,1,2] and they are reachable to each other within distance 4.
- The set [0], after closing, active branches are [1,2] and they are reachable to each other within distance 2.
- The set [1], after closing, active branches are [0,2] and they are reachable to each other within distance 2.
- The set [0,1], after closing, the active branch is [2].
- The set [1,2], after closing, the active branch is [0].
- The set [0,2], after closing, the active branch is [1].
- The set [0,1,2], after closing, there are no active branches.
It can be proven, that there are only 7 possible sets of closing branches.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> n = 1, maxDistance = 10, roads = []
<strong>Output:</strong> 2
<strong>Explanation:</strong> The possible sets of closing branches are:
- The set [], after closing, the active branch is [0].
- The set [0], after closing, there are no active branches.
It can be proven, that there are only 2 possible sets of closing branches.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 10</code></li>
	<li><code>1 &lt;= maxDistance &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= roads.length &lt;= 1000</code></li>
	<li><code>roads[i].length == 3</code></li>
	<li><code>0 &lt;= u<sub>i</sub>, v<sub>i</sub> &lt;= n - 1</code></li>
	<li><code>u<sub>i</sub> != v<sub>i</sub></code></li>
	<li><code>1 &lt;= w<sub>i</sub> &lt;= 1000</code></li>
	<li>All branches are reachable from each other by traveling some roads.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Floyd-Warshall`**

- Time complexity: <em>O(2<sup>n</sup>n<sup>3</sup>)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number} maxDistance
 * @param {number[][]} roads
 * @return {number}
 */
const numberOfSets = function (n, maxDistance, roads) {
  const maxMask = 1 << n;
  let result = 0;

  const isValidSet = mask => {
    const dist = new Array(n)
      .fill('')
      .map(() => {
        return new Array(n).fill(Number.MAX_SAFE_INTEGER);
      });

    for (const [u, v, w] of roads) {
      if (!((mask >> u) & 1) || !((mask >> v) & 1)) continue;

      dist[u][v] = Math.min(dist[u][v], w);
      dist[v][u] = Math.min(dist[v][u], w);
    }

    for (let index = 0; index < n; index++) {
      if ((mask >> index) & 1) {
        dist[index][index] = 0;
      }
    }

    for (let index = 0; index < n; index++) {
      if (!((mask >> index) & 1)) continue;

      for (let a = 0; a < n; a++) {
        if (!((mask >> a) & 1)) continue;

        for (let b = 0; b < n; b++) {
          if (!((mask >> b) & 1)) continue;

          const newDist = dist[a][index] + dist[b][index];

          dist[a][b] = Math.min(dist[a][b], newDist);
        }
      }
    }

    let maxDist = 0;

    for (let a = 0; a < n; a++) {
      if (!((mask >> a) & 1)) continue;

      for (let b = a + 1; b < n; b++) {
        if (!((mask >> b) & 1)) continue;

        maxDist = Math.max(dist[a][b], maxDist);
      }
    }

    return maxDist <= maxDistance;
  };

  for (let mask = 0; mask < maxMask; mask++) {
    if (isValidSet(mask)) {
      result += 1;
    }
  }

  return result;
};
```
