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

- Time complexity: <em>O(mn)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
const numMagicSquaresInside = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  let result = 0;

  const isMagicSquare = (centerRow, centerCol) => {
    if (grid[centerRow][centerCol] !== 5) return false;

    const numSet = new Set();

    for (let a = -1; a <= 1; a++) {
      let sum1 = 0;
      let sum2 = 0;

      for (let b = -1; b <= 1; b++) {
        const num1 = grid[centerRow + a][centerCol + b];
        const num2 = grid[centerRow + b][centerCol + a];

        if (num1 < 1 || num1 > 9 || num2 < 1 || num2 > 9 || numSet.has(num1)) return false;

        sum1 += num1;
        sum2 += num2;
        numSet.add(num1);
      }

      if (sum1 !== 15 || sum2 !== 15) return false;
    }

    let diagonalSum1 = 0;
    let diagonalSum2 = 0;

    for (let index = -1; index <= 1; index++) {
      diagonalSum1 += grid[centerRow + index][centerCol + index];
      diagonalSum2 += grid[centerRow + index][centerCol - index];
    }

    return diagonalSum1 === 15 && diagonalSum2 === 15;
  };

  for (let row = 1; row < m - 1; row++) {
    for (let col = 1; col < n - 1; col++) {
      if (isMagicSquare(row, col)) {
        result += 1;
      }
    }
  }

  return result;
};
```
