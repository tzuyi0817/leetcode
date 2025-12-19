# [2328. Number of Increasing Paths in a Grid](https://leetcode.com/problems/number-of-increasing-paths-in-a-grid)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an <code>m x n</code> integer matrix <code>grid</code>, where you can move from a cell to any adjacent cell in all <code>4</code> directions.</p>

<p>Return <em>the number of <strong>strictly</strong> <strong>increasing</strong> paths in the grid such that you can start from <strong>any</strong> cell and end at <strong>any</strong> cell. </em>Since the answer may be very large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>Two paths are considered different if they do not have exactly the same sequence of visited cells.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/05/10/griddrawio-4.png" style="width: 181px; height: 121px;">
<pre><strong>Input:</strong> grid = [[1,1],[3,4]]
<strong>Output:</strong> 8
<strong>Explanation:</strong> The strictly increasing paths are:
- Paths with length 1: [1], [1], [3], [4].
- Paths with length 2: [1 -&gt; 3], [1 -&gt; 4], [3 -&gt; 4].
- Paths with length 3: [1 -&gt; 3 -&gt; 4].
The total number of paths is 4 + 3 + 1 = 8.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> grid = [[1],[2]]
<strong>Output:</strong> 3
<strong>Explanation:</strong> The strictly increasing paths are:
- Paths with length 1: [1], [2].
- Paths with length 2: [1 -&gt; 2].
The total number of paths is 2 + 1 = 3.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 1000</code></li>
	<li><code>1 &lt;= m * n &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= grid[i][j] &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(mn)</em>
- Space complexity: <em>O(mn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
const countPaths = function (grid) {
  const MODULO = 10 ** 9 + 7;
  const m = grid.length;
  const n = grid[0].length;
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const dp = Array.from({ length: m }, () => new Array(n).fill(0));
  let result = 0;

  const increasingPaths = (row, col) => {
    if (dp[row][col]) return dp[row][col];

    const current = grid[row][col];
    let paths = 1;

    for (const [moveRow, moveCol] of directions) {
      const nextRow = row + moveRow;
      const nextCol = col + moveCol;

      if (nextRow < 0 || nextCol < 0 || nextRow >= m || nextCol >= n) continue;
      if (current >= grid[nextRow][nextCol]) continue;

      paths = (paths + increasingPaths(nextRow, nextCol)) % MODULO;
    }

    dp[row][col] = paths;

    return paths;
  };

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      result = (result + increasingPaths(row, col)) % MODULO;
    }
  }

  return result;
};
```
