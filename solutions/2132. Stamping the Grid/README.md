# [2132. Stamping the Grid](https://leetcode.com/problems/stamping-the-grid)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an <code>m x n</code> binary matrix <code>grid</code> where each cell is either <code>0</code> (empty) or <code>1</code> (occupied).</p>

<p>You are then given stamps of size <code>stampHeight x stampWidth</code>. We want to fit the stamps such that they follow the given <strong>restrictions</strong> and <strong>requirements</strong>:</p>

<ol>
	<li>Cover all the <strong>empty</strong> cells.</li>
	<li>Do not cover any of the <strong>occupied</strong> cells.</li>
	<li>We can put as <strong>many</strong> stamps as we want.</li>
	<li>Stamps can <strong>overlap</strong> with each other.</li>
	<li>Stamps are not allowed to be <strong>rotated</strong>.</li>
	<li>Stamps must stay completely <strong>inside</strong> the grid.</li>
</ol>

<p>Return <code>true</code> <em>if it is possible to fit the stamps while following the given restrictions and requirements. Otherwise, return</em> <code>false</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/11/03/ex1.png" style="width: 180px; height: 237px;">
<pre><strong>Input:</strong> grid = [[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]], stampHeight = 4, stampWidth = 3
<strong>Output:</strong> true
<strong>Explanation:</strong> We have two overlapping stamps (labeled 1 and 2 in the image) that are able to cover all the empty cells.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/11/03/ex2.png" style="width: 170px; height: 179px;">
<pre><strong>Input:</strong> grid = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], stampHeight = 2, stampWidth = 2 
<strong>Output:</strong> false 
<strong>Explanation:</strong> There is no way to fit the stamps onto all the empty cells without the stamps going outside the grid.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[r].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= m * n &lt;= 2 * 10<sup>5</sup></code></li>
	<li><code>grid[r][c]</code> is either <code>0</code> or <code>1</code>.</li>
	<li><code>1 &lt;= stampHeight, stampWidth &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Prefix Sum`**

- Time complexity: <em>O(mn)</em>
- Space complexity: <em>O(mn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} grid
 * @param {number} stampHeight
 * @param {number} stampWidth
 * @return {boolean}
 */
const possibleToStamp = function (grid, stampHeight, stampWidth) {
  const m = grid.length;
  const n = grid[0].length;
  const occupied = Array.from({ length: m }, () => new Array(n).fill(0));
  const fit = Array.from({ length: m }, () => new Array(n).fill(false));
  const fitCount = Array.from({ length: m }, () => new Array(n).fill(0));

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = grid[row][col];
      const upperOccupied = occupied[row - 1]?.[col] ?? 0;
      const leftOccupied = occupied[row][col - 1] ?? 0;
      const upperLeftOccupied = occupied[row - 1]?.[col - 1] ?? 0;

      occupied[row][col] = value + upperOccupied + leftOccupied - upperLeftOccupied;

      if (row + 1 < stampHeight || col + 1 < stampWidth) continue;

      const x = row - stampHeight;
      const y = col - stampWidth;
      const upperBoundary = occupied[x]?.[col] ?? 0;
      const leftBoundary = occupied[row][y] ?? 0;
      const upperLeftBoundary = occupied[x]?.[y] ?? 0;

      if (occupied[row][col] - upperBoundary - leftBoundary + upperLeftBoundary === 0) {
        fit[row][col] = true;
      }
    }
  }

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = fit[row][col] ? 1 : 0;
      const upperCount = fitCount[row - 1]?.[col] ?? 0;
      const leftCount = fitCount[row][col - 1] ?? 0;
      const upperLeftCount = fitCount[row - 1]?.[col - 1] ?? 0;

      fitCount[row][col] = value + upperCount + leftCount - upperLeftCount;
    }
  }

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (grid[row][col]) continue;

      const x = Math.min(row + stampHeight, m) - 1;
      const y = Math.min(col + stampWidth, n) - 1;
      const leftCount = fitCount[x][col - 1] ?? 0;
      const upperCount = fitCount[row - 1]?.[y] ?? 0;
      const upperLeftCount = fitCount[row - 1]?.[col - 1] ?? 0;

      if (fitCount[x][y] - upperCount - leftCount + upperLeftCount === 0) {
        return false;
      }
    }
  }

  return true;
};
```
