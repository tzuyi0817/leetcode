# [2684. Maximum Number of Moves in a Grid](https://leetcode.com/problems/maximum-number-of-moves-in-a-grid)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a <strong>0-indexed</strong> <code>m x n</code> matrix <code>grid</code> consisting of <strong>positive</strong> integers.</p>

<p>You can start at <strong>any</strong> cell in the first column of the matrix, and traverse the grid in the following way:</p>

<ul>
	<li>From a cell <code>(row, col)</code>, you can move to any of the cells: <code>(row - 1, col + 1)</code>, <code>(row, col + 1)</code> and <code>(row + 1, col + 1)</code> such that the value of the cell you move to, should be <strong>strictly</strong> bigger than the value of the current cell.</li>
</ul>

<p>Return <em>the <strong>maximum</strong> number of <strong>moves</strong> that you can perform.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2023/04/11/yetgriddrawio-10.png" style="width: 201px; height: 201px;">
<pre><strong>Input:</strong> grid = [[2,4,3,5],[5,4,9,3],[3,4,2,11],[10,9,13,15]]
<strong>Output:</strong> 3
<strong>Explanation:</strong> We can start at the cell (0, 0) and make the following moves:
- (0, 0) -&gt; (0, 1).
- (0, 1) -&gt; (1, 2).
- (1, 2) -&gt; (2, 3).
It can be shown that it is the maximum number of moves that can be made.</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><img alt="" src="https://assets.leetcode.com/uploads/2023/04/12/yetgrid4drawio.png">
<strong>Input:</strong> grid = [[3,2,4],[2,1,9],[1,1,7]]
<strong>Output:</strong> 0
<strong>Explanation:</strong> Starting from any cell in the first column we cannot perform any moves.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>2 &lt;= m, n &lt;= 1000</code></li>
	<li><code>4 &lt;= m * n &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= grid[i][j] &lt;= 10<sup>6</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(mn)</em>
- Space complexity: <em>O(m)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
const maxMoves = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  let dp = new Array(m + 1).fill(0);

  for (let col = n - 2; col >= 0; col--) {
    const nextDp = new Array(m + 1).fill(0);

    for (let row = 0; row < m; row++) {
      const value = grid[row][col];
      const upper = grid[row - 1]?.[col + 1];
      const middle = grid[row][col + 1];
      const lower = grid[row + 1]?.[col + 1];
      const index = row + 1;

      const upperStep = value < upper ? dp[index - 1] + 1 : 0;
      const middleStep = value < middle ? dp[index] + 1 : 0;
      const lowerStep = value < lower ? dp[index + 1] + 1 : 0;

      nextDp[index] = Math.max(upperStep, middleStep, lowerStep);
    }
    dp = nextDp;
  }
  return Math.max(...dp);
};
```
