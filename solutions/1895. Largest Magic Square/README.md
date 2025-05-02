# [1895. Largest Magic Square](https://leetcode.com/problems/largest-magic-square)

## Description

<div class="elfjS" data-track-load="description_content"><p>A <code>k x k</code> <strong>magic square</strong> is a <code>k x k</code> grid filled with integers such that every row sum, every column sum, and both diagonal sums are <strong>all equal</strong>. The integers in the magic square <strong>do not have to be distinct</strong>. Every <code>1 x 1</code> grid is trivially a <strong>magic square</strong>.</p>

<p>Given an <code>m x n</code> integer <code>grid</code>, return <em>the <strong>size</strong> (i.e., the side length </em><code>k</code><em>) of the <strong>largest magic square</strong> that can be found within this grid</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/05/29/magicsquare-grid.jpg" style="width: 413px; height: 335px;">
<pre><strong>Input:</strong> grid = [[7,1,4,5,6],[2,5,1,6,4],[1,5,4,3,2],[1,2,7,3,4]]
<strong>Output:</strong> 3
<strong>Explanation:</strong> The largest magic square has a size of 3.
Every row sum, column sum, and diagonal sum of this magic square is equal to 12.
- Row sums: 5+1+6 = 5+4+3 = 2+7+3 = 12
- Column sums: 5+5+2 = 1+4+7 = 6+3+3 = 12
- Diagonal sums: 5+4+3 = 6+4+2 = 12
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/05/29/magicsquare2-grid.jpg" style="width: 333px; height: 255px;">
<pre><strong>Input:</strong> grid = [[5,1,3,1],[9,3,3,1],[1,3,3,8]]
<strong>Output:</strong> 2
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 50</code></li>
	<li><code>1 &lt;= grid[i][j] &lt;= 10<sup>6</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Prefix Sum`**

- Time complexity: <em>O(mn\*min(m,n)<sup>2</sup>)</em>
- Space complexity: <em>O(mn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
const largestMagicSquare = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const rowSums = new Array(m).fill('').map(_ => new Array(n + 1).fill(0));
  const colSums = new Array(n).fill('').map(_ => new Array(m + 1).fill(0));
  const boundary = Math.min(m, n);

  const isValid = (sum, row, col, boundary) => {
    for (let length = 0; length < boundary; length++) {
      const rowSum = rowSums[row + length][col + boundary] - rowSums[row + length][col];
      const colSum = colSums[col + length][row + boundary] - colSums[col + length][row];

      if (sum !== rowSum || sum !== colSum) return false;
    }
    return true;
  };

  const isValidDiagonal = (sum, row, col, boundary) => {
    let diagonal1 = 0;
    let diagonal2 = 0;

    for (let length = 0; length < boundary; length++) {
      diagonal1 += grid[row + length][col + length];
      diagonal2 += grid[row + length][col + boundary - length - 1];
    }
    return sum === diagonal1 && sum === diagonal2;
  };

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = grid[row][col];

      rowSums[row][col + 1] = rowSums[row][col] + value;
      colSums[col][row + 1] = colSums[col][row] + value;
    }
  }
  for (let length = boundary; length > 1; length--) {
    for (let row = 0; row <= m - length; row++) {
      for (let col = 0; col <= n - length; col++) {
        const sum = rowSums[row][col + length] - rowSums[row][col];

        if (!isValid(sum, row, col, length)) continue;
        if (isValidDiagonal(sum, row, col, length)) return length;
      }
    }
  }
  return 1;
};
```
