# [1463. Cherry Pickup II](https://leetcode.com/problems/cherry-pickup-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a <code>rows x cols</code> matrix <code>grid</code> representing a field of cherries where <code>grid[i][j]</code> represents the number of cherries that you can collect from the <code>(i, j)</code> cell.</p>

<p>You have two robots that can collect cherries for you:</p>

<ul>
	<li><strong>Robot #1</strong> is located at the <strong>top-left corner</strong> <code>(0, 0)</code>, and</li>
	<li><strong>Robot #2</strong> is located at the <strong>top-right corner</strong> <code>(0, cols - 1)</code>.</li>
</ul>

<p>Return <em>the maximum number of cherries collection using both robots by following the rules below</em>:</p>

<ul>
	<li>From a cell <code>(i, j)</code>, robots can move to cell <code>(i + 1, j - 1)</code>, <code>(i + 1, j)</code>, or <code>(i + 1, j + 1)</code>.</li>
	<li>When any robot passes through a cell, It picks up all cherries, and the cell becomes an empty cell.</li>
	<li>When both robots stay in the same cell, only one takes the cherries.</li>
	<li>Both robots cannot move outside of the grid at any moment.</li>
	<li>Both robots should reach the bottom row in <code>grid</code>.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/04/29/sample_1_1802.png" style="width: 374px; height: 501px;">
<pre><strong>Input:</strong> grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]
<strong>Output:</strong> 24
<strong>Explanation:</strong> Path of robot #1 and #2 are described in color green and blue respectively.
Cherries taken by Robot #1, (3 + 2 + 5 + 2) = 12.
Cherries taken by Robot #2, (1 + 5 + 5 + 1) = 12.
Total of cherries: 12 + 12 = 24.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/04/23/sample_2_1802.png" style="width: 500px; height: 452px;">
<pre><strong>Input:</strong> grid = [[1,0,0,0,0,0,1],[2,0,0,0,0,3,0],[2,0,9,0,0,0,0],[0,3,0,5,4,0,0],[1,0,2,3,0,0,6]]
<strong>Output:</strong> 28
<strong>Explanation:</strong> Path of robot #1 and #2 are described in color green and blue respectively.
Cherries taken by Robot #1, (1 + 9 + 5 + 2) = 17.
Cherries taken by Robot #2, (1 + 3 + 4 + 3) = 11.
Total of cherries: 17 + 11 = 28.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>rows == grid.length</code></li>
	<li><code>cols == grid[i].length</code></li>
	<li><code>2 &lt;= rows, cols &lt;= 70</code></li>
	<li><code>0 &lt;= grid[i][j] &lt;= 100</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(mn<sup>2</sup>)</em>
- Space complexity: <em>O(mn<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
const cherryPickup = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const dp = Array.from({ length: m }, () => {
    return new Array(n)
      .fill('')
      .map(_ => new Array(n).fill(-1));
  });

  const collectCherry = (row, col1, col2) => {
    if (row >= m || col1 < 0 || col1 >= n || col2 < 0 || col2 >= n) return 0;
    if (dp[row][col1][col2] !== -1) return dp[row][col1][col2];
    const robot1 = grid[row][col1];
    const robot2 = grid[row][col2];
    const cherries = col1 === col2 ? robot1 : robot1 + robot2;
    let result = cherries;

    for (let moveCol1 = -1; moveCol1 <= 1; moveCol1++) {
      const nextCol1 = col1 + moveCol1;

      for (let moveCol2 = -1; moveCol2 <= 1; moveCol2++) {
        const nextCol2 = col2 + moveCol2;
        const nextCherries = collectCherry(row + 1, nextCol1, nextCol2);

        result = Math.max(cherries + nextCherries, result);
      }
    }

    dp[row][col1][col2] = result;

    return result;
  };

  return collectCherry(0, 0, n - 1);
};
```
