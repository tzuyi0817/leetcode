# [861. Score After Flipping Matrix](https://leetcode.com/problems/score-after-flipping-matrix)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an <code>m x n</code> binary matrix <code>grid</code>.</p>

<p>A <strong>move</strong> consists of choosing any row or column and toggling each value in that row or column (i.e., changing all <code>0</code>'s to <code>1</code>'s, and all <code>1</code>'s to <code>0</code>'s).</p>

<p>Every row of the matrix is interpreted as a binary number, and the <strong>score</strong> of the matrix is the sum of these numbers.</p>

<p>Return <em>the highest possible <strong>score</strong> after making any number of <strong>moves</strong> (including zero moves)</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/23/lc-toogle1.jpg" style="width: 500px; height: 299px;">
<pre><strong>Input:</strong> grid = [[0,0,1,1],[1,0,1,0],[1,1,0,0]]
<strong>Output:</strong> 39
<strong>Explanation:</strong> 0b1111 + 0b1001 + 0b1111 = 15 + 9 + 15 = 39
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> grid = [[0]]
<strong>Output:</strong> 1
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 20</code></li>
	<li><code>grid[i][j]</code> is either <code>0</code> or <code>1</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(mn)</em>
- Space complexity: <em>O(mn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
const matrixScore = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  for (let row = 0; row < m; row++) {
    if (grid[row][0] === 1) continue;

    for (let col = 0; col < n; col++) {
      grid[row][col] = grid[row][col] ? 0 : 1;
    }
  }
  for (let col = 1; col < n; col++) {
    let count = 0;

    for (let row = 0; row < m; row++) {
      if (grid[row][col]) count += 1;
    }
    if (count >= m / 2) continue;
    for (let row = 0; row < m; row++) {
      grid[row][col] = grid[row][col] ? 0 : 1;
    }
  }
  return grid.reduce((result, row) => {
    return result + Number.parseInt(row.join(''), 2);
  }, 0);
};
```
