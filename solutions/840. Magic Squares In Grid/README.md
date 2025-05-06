# [840. Magic Squares In Grid](https://leetcode.com/problems/magic-squares-in-grid)

## Description

<div class="elfjS" data-track-load="description_content"><p>A <code>3 x 3</code> <strong>magic square</strong> is a <code>3 x 3</code> grid filled with distinct numbers <strong>from </strong>1<strong> to </strong>9 such that each row, column, and both diagonals all have the same sum.</p>

<p>Given a <code>row x col</code> <code>grid</code> of integers, how many <code>3 x 3</code> contiguous magic square subgrids are there?</p>

<p>Note: while a magic square can only contain numbers from 1 to 9, <code>grid</code> may contain numbers up to 15.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/09/11/magic_main.jpg" style="width: 322px; height: 242px;">
<pre><strong>Input:</strong> grid = [[4,3,8,4],[9,5,1,9],[2,7,6,2]]
<strong>Output:</strong> 1
<strong>Explanation: </strong>
The following subgrid is a 3 x 3 magic square:
<img alt="" src="https://assets.leetcode.com/uploads/2020/09/11/magic_valid.jpg" style="width: 242px; height: 242px;">
while this one is not:
<img alt="" src="https://assets.leetcode.com/uploads/2020/09/11/magic_invalid.jpg" style="width: 242px; height: 242px;">
In total, there is only one magic square inside the given grid.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> grid = [[8]]
<strong>Output:</strong> 0
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>row == grid.length</code></li>
	<li><code>col == grid[i].length</code></li>
	<li><code>1 &lt;= row, col &lt;= 10</code></li>
	<li><code>0 &lt;= grid[i][j] &lt;= 15</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Math`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
const numMagicSquaresInside = function (grid) {
  const n = grid.length;
  const m = grid[0].length;
  let result = 0;

  const isMagicSquare = (row, col) => {
    const upperLeft = grid[row - 1][col - 1];
    const upper = grid[row - 1][col];
    const upperRight = grid[row - 1][col + 1];
    const left = grid[row][col - 1];
    const current = grid[row][col];
    const right = grid[row][col + 1];
    const lowerLeft = grid[row + 1][col - 1];
    const lower = grid[row + 1][col];
    const lowerRight = grid[row + 1][col + 1];
    const nums = new Set([upperLeft, upper, upperRight, left, current, right, lowerLeft, lower, lowerRight]);

    if (nums.size !== 9) return false;

    for (const num of nums) {
      if (num > 9 || num < 1) return false;
    }

    return (
      upperLeft + upper + upperRight === 15 &&
      lowerLeft + lower + lowerRight === 15 &&
      upperLeft + left + lowerLeft === 15 &&
      upper + current + lower === 15 &&
      upperRight + right + lowerRight === 15 &&
      upperLeft + current + lowerRight === 15 &&
      upperRight + current + lowerLeft === 15
    );
  };

  for (let row = 1; row < n - 1; row++) {
    for (let col = 1; col < m - 1; col++) {
      if (grid[row][col] !== 5) continue;
      if (isMagicSquare(row, col)) result += 1;
    }
  }
  return result;
};
```
