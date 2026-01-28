# [3651. Minimum Cost Path with Teleportations](https://leetcode.com/problems/minimum-cost-path-with-teleportations)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a <code>m x n</code> 2D integer array <code>grid</code> and an integer <code>k</code>. You start at the top-left cell <code>(0, 0)</code> and your goal is to reach the bottom‐right cell <code>(m - 1, n - 1)</code>.</p>

<p>There are two types of moves available:</p>

<ul>
	<li>
	<p><strong>Normal move</strong>: You can move right or down from your current cell <code>(i, j)</code>, i.e. you can move to <code>(i, j + 1)</code> (right) or <code>(i + 1, j)</code> (down). The cost is the value of the destination cell.</p>
	</li>
	<li>
	<p><strong>Teleportation</strong>: You can teleport from any cell <code>(i, j)</code>, to any cell <code>(x, y)</code> such that <code>grid[x][y] &lt;= grid[i][j]</code>; the cost of this move is 0. You may teleport at most <code>k</code> times.</p>
	</li>
</ul>

<p>Return the <strong>minimum</strong> total cost to reach cell <code>(m - 1, n - 1)</code> from <code>(0, 0)</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">grid = [[1,3,3],[2,5,4],[4,3,5]], k = 2</span></p>

<p><strong>Output:</strong> <span class="example-io">7</span></p>

<p><strong>Explanation:</strong></p>

<p>Initially we are at (0, 0) and cost is 0.</p>

<table style="border: 1px solid black;"><tbody><tr><th style="border: 1px solid black;">Current Position</th><th style="border: 1px solid black;">Move</th><th style="border: 1px solid black;">New Position</th><th style="border: 1px solid black;">Total Cost</th></tr><tr><td style="border: 1px solid black;"><code>(0, 0)</code></td><td style="border: 1px solid black;">Move Down</td><td style="border: 1px solid black;"><code>(1, 0)</code></td><td style="border: 1px solid black;"><code>0 + 2 = 2</code></td></tr><tr><td style="border: 1px solid black;"><code>(1, 0)</code></td><td style="border: 1px solid black;">Move Right</td><td style="border: 1px solid black;"><code>(1, 1)</code></td><td style="border: 1px solid black;"><code>2 + 5 = 7</code></td></tr><tr><td style="border: 1px solid black;"><code>(1, 1)</code></td><td style="border: 1px solid black;">Teleport to <code>(2, 2)</code></td><td style="border: 1px solid black;"><code>(2, 2)</code></td><td style="border: 1px solid black;"><code>7 + 0 = 7</code></td></tr></tbody></table>

<p>The minimum cost to reach bottom-right cell is 7.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">grid = [[1,2],[2,3],[3,4]], k = 1</span></p>

<p><strong>Output:</strong> <span class="example-io">9</span></p>

<p><strong>Explanation: </strong></p>

<p>Initially we are at (0, 0) and cost is 0.</p>

<table style="border: 1px solid black;"><tbody><tr><th style="border: 1px solid black;">Current Position</th><th style="border: 1px solid black;">Move</th><th style="border: 1px solid black;">New Position</th><th style="border: 1px solid black;">Total Cost</th></tr><tr><td style="border: 1px solid black;"><code>(0, 0)</code></td><td style="border: 1px solid black;">Move Down</td><td style="border: 1px solid black;"><code>(1, 0)</code></td><td style="border: 1px solid black;"><code>0 + 2 = 2</code></td></tr><tr><td style="border: 1px solid black;"><code>(1, 0)</code></td><td style="border: 1px solid black;">Move Right</td><td style="border: 1px solid black;"><code>(1, 1)</code></td><td style="border: 1px solid black;"><code>2 + 3 = 5</code></td></tr><tr><td style="border: 1px solid black;"><code>(1, 1)</code></td><td style="border: 1px solid black;">Move Down</td><td style="border: 1px solid black;"><code>(2, 1)</code></td><td style="border: 1px solid black;"><code>5 + 4 = 9</code></td></tr></tbody></table>

<p>The minimum cost to reach bottom-right cell is 9.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= m, n &lt;= 80</code></li>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>0 &lt;= grid[i][j] &lt;= 10<sup>4</sup></code></li>
	<li><code>0 &lt;= k &lt;= 10</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O((k+logmn)\*mn)</em>
- Space complexity: <em>O(mn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
const minCost = function (grid, k) {
  const m = grid.length;
  const n = grid[0].length;
  const points = [];

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      points.push({ row, col, value: grid[row][col] });
    }
  }

  points.sort((a, b) => a.value - b.value);

  const costs = Array.from({ length: m }, () => {
    return new Array(n).fill(Number.MAX_SAFE_INTEGER);
  });

  for (let t = 0; t <= k; t++) {
    let minCost = Number.MAX_SAFE_INTEGER;
    let left = 0;

    for (let index = 0; index < points.length; index++) {
      const { row, col, value } = points[index];
      const next = points[index + 1];

      minCost = Math.min(minCost, costs[row][col]);

      if (index + 1 < points.length && value === next.value) {
        continue;
      }

      for (let r = left; r <= index; r++) {
        costs[points[r].row][points[r].col] = minCost;
      }

      left = index + 1;
    }

    for (let row = m - 1; row >= 0; row--) {
      for (let col = n - 1; col >= 0; col--) {
        if (row === m - 1 && col === n - 1) {
          costs[row][col] = 0;
          continue;
        }

        if (row !== m - 1) {
          const cost = costs[row + 1][col] + grid[row + 1][col];

          costs[row][col] = Math.min(costs[row][col], cost);
        }

        if (col !== n - 1) {
          const cost = costs[row][col + 1] + grid[row][col + 1];

          costs[row][col] = Math.min(costs[row][col], cost);
        }
      }
    }
  }

  return costs[0][0];
};
```
