# [3148. Maximum Difference Score in a Grid](https://leetcode.com/problems/maximum-difference-score-in-a-grid)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an <code>m x n</code> matrix <code>grid</code> consisting of <strong>positive</strong> integers. You can move from a cell in the matrix to <strong>any</strong> other cell that is either to the bottom or to the right (not necessarily adjacent). The score of a move from a cell with the value <code>c1</code> to a cell with the value <code>c2</code> is <code>c2 - c1</code>.</p>

<p>You can start at <strong>any</strong> cell, and you have to make <strong>at least</strong> one move.</p>

<p>Return the <strong>maximum</strong> total score you can achieve.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2024/03/14/grid1.png" style="width: 240px; height: 240px;">
<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">grid = [[9,5,7,3],[8,9,6,1],[6,7,14,3],[2,5,3,1]]</span></p>

<p><strong>Output:</strong> <span class="example-io">9</span></p>

<p><strong>Explanation:</strong> We start at the cell <code>(0, 1)</code>, and we perform the following moves:<br>
- Move from the cell <code>(0, 1)</code> to <code>(2, 1)</code> with a score of <code>7 - 5 = 2</code>.<br>
- Move from the cell <code>(2, 1)</code> to <code>(2, 2)</code> with a score of <code>14 - 7 = 7</code>.<br>
The total score is <code>2 + 7 = 9</code>.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/04/08/moregridsdrawio-1.png" style="width: 180px; height: 116px;"></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">grid = [[4,3,2],[3,2,1]]</span></p>

<p><strong>Output:</strong> <span class="example-io">-1</span></p>

<p><strong>Explanation:</strong> We start at the cell <code>(0, 0)</code>, and we perform one move: <code>(0, 0)</code> to <code>(0, 1)</code>. The score is <code>3 - 4 = -1</code>.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>2 &lt;= m, n &lt;= 1000</code></li>
	<li><code>4 &lt;= m * n &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= grid[i][j] &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(mn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
const maxScore = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  let dp = [];
  let result = Number.MIN_SAFE_INTEGER;

  for (let row = 0; row < m; row++) {
    const current = [];

    for (let col = 0; col < n; col++) {
      const value = grid[row][col];
      let min = value;

      if (row > 0) {
        result = Math.max(result, value - dp[col]);
        min = Math.min(min, dp[col]);
      }
      if (col > 0) {
        result = Math.max(result, value - current[col - 1]);
        min = Math.min(min, current[col - 1]);
      }
      current.push(min);
    }
    dp = current;
  }
  return result;
};
```
