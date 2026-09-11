# [3197. Find the Minimum Area to Cover All Ones II](https://leetcode.com/problems/find-the-minimum-area-to-cover-all-ones-ii)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>You are given a 2D <strong>binary</strong> array <code>grid</code>. You need to find 3 <strong>non-overlapping</strong> rectangles having <strong>non-zero</strong> areas with horizontal and vertical sides such that all the 1's in <code>grid</code> lie inside these rectangles.</p>

<p>Return the <strong>minimum</strong> possible sum of the area of these rectangles.</p>

<p><strong>Note</strong> that the rectangles are allowed to touch.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">grid = [[1,0,1],[1,1,1]]</span></p>

<p><strong>Output:</strong> <span class="example-io">5</span></p>

<p><strong>Explanation:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/05/14/example0rect21.png" style="padding: 10px; background: rgb(255, 255, 255); border-radius: 0.5rem; width: 280px; height: 198px;"></p>

<ul>
	<li>The 1's at <code>(0, 0)</code> and <code>(1, 0)</code> are covered by a rectangle of area 2.</li>
	<li>The 1's at <code>(0, 2)</code> and <code>(1, 2)</code> are covered by a rectangle of area 2.</li>
	<li>The 1 at <code>(1, 1)</code> is covered by a rectangle of area 1.</li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">grid = [[1,0,1,0],[0,1,0,1]]</span></p>

<p><strong>Output:</strong> <span class="example-io">5</span></p>

<p><strong>Explanation:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/05/14/example1rect2.png" style="padding: 10px; background: rgb(255, 255, 255); border-radius: 0.5rem; width: 356px; height: 198px;"></p>

<ul>
	<li>The 1's at <code>(0, 0)</code> and <code>(0, 2)</code> are covered by a rectangle of area 3.</li>
	<li>The 1 at <code>(1, 1)</code> is covered by a rectangle of area 1.</li>
	<li>The 1 at <code>(1, 3)</code> is covered by a rectangle of area 1.</li>
</ul>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= grid.length, grid[i].length &lt;= 30</code></li>
	<li><code>grid[i][j]</code> is either 0 or 1.</li>
	<li>The input is generated such that there are at least three 1's in <code>grid</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Enumerate`**

- Time complexity: <em>O(m<sup>2</sup>n<sup>2</sup>)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
const minimumSum = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  let result = m * n;

  for (let row = 0; row < m - 1; row++) {
    const top = minimumArea(grid, 0, 0, row, n - 1);

    for (let col = 0; col < n - 1; col++) {
      const left = minimumArea(grid, row + 1, 0, m - 1, col);
      const right = minimumArea(grid, row + 1, col + 1, m - 1, n - 1);

      result = Math.min(top + left + right, result);
    }
  }

  for (let row = 1; row < m; row++) {
    const bottom = minimumArea(grid, row, 0, m - 1, n - 1);

    for (let col = 0; col < n - 1; col++) {
      const left = minimumArea(grid, 0, 0, row - 1, col);
      const right = minimumArea(grid, 0, col + 1, row - 1, n - 1);

      result = Math.min(bottom + left + right, result);
    }
  }

  for (let row = 0; row < m - 2; row++) {
    const top = minimumArea(grid, 0, 0, row, n - 1);

    for (let divider = row + 1; divider < m - 1; divider++) {
      const middle = minimumArea(grid, row + 1, 0, divider, n - 1);
      const bottom = minimumArea(grid, divider + 1, 0, m - 1, n - 1);

      result = Math.min(top + middle + bottom, result);
    }
  }

  for (let col = 0; col < n - 2; col++) {
    const left = minimumArea(grid, 0, 0, m - 1, col);

    for (let divider = col + 1; divider < n - 1; divider++) {
      const middle = minimumArea(grid, 0, col + 1, m - 1, divider);
      const right = minimumArea(grid, 0, divider + 1, m - 1, n - 1);

      result = Math.min(left + middle + right, result);
    }
  }

  for (let col = 0; col < n - 1; col++) {
    const left = minimumArea(grid, 0, 0, m - 1, col);

    for (let row = 0; row < m - 1; row++) {
      const top = minimumArea(grid, 0, col + 1, row, n - 1);
      const bottom = minimumArea(grid, row + 1, col + 1, m - 1, n - 1);

      result = Math.min(left + top + bottom, result);
    }
  }

  for (let col = 1; col < n; col++) {
    const right = minimumArea(grid, 0, col, m - 1, n - 1);

    for (let row = 0; row < m - 1; row++) {
      const top = minimumArea(grid, 0, 0, row, col - 1);
      const bottom = minimumArea(grid, row + 1, 0, m - 1, col - 1);

      result = Math.min(right + top + bottom, result);
    }
  }

  return result;
};

function minimumArea(grid, startRow, startCol, endRow, endCol) {
  let minRow = Number.MAX_SAFE_INTEGER;
  let minCol = Number.MAX_SAFE_INTEGER;
  let maxRow = -1;
  let maxCol = -1;

  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      if (grid[row][col] === 0) continue;

      minRow = Math.min(row, minRow);
      minCol = Math.min(col, minCol);
      maxRow = Math.max(row, maxRow);
      maxCol = Math.max(col, maxCol);
    }
  }

  if (maxRow === -1) return 0;

  return (maxRow - minRow + 1) * (maxCol - minCol + 1);
}
```
