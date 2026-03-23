# [1594. Maximum Non Negative Product in a Matrix](https://leetcode.com/problems/maximum-non-negative-product-in-a-matrix)

## Description

<div class="xFUwe" data-track-load="description_content"><p>You are given a <code>m x n</code> matrix <code>grid</code>. Initially, you are located at the top-left corner <code>(0, 0)</code>, and in each step, you can only <strong>move right or down</strong> in the matrix.</p>

<p>Among all possible paths starting from the top-left corner <code>(0, 0)</code> and ending in the bottom-right corner <code>(m - 1, n - 1)</code>, find the path with the <strong>maximum non-negative product</strong>. The product of a path is the product of all integers in the grid cells visited along the path.</p>

<p>Return the <em>maximum non-negative product <strong>modulo</strong> </em><code>10<sup>9</sup> + 7</code>. <em>If the maximum product is <strong>negative</strong>, return </em><code>-1</code>.</p>

<p>Notice that the modulo is performed after getting the maximum product.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/12/23/product1.jpg" style="width: 244px; height: 245px;">
<pre><strong>Input:</strong> grid = [[-1,-2,-3],[-2,-3,-3],[-3,-3,-2]]
<strong>Output:</strong> -1
<strong>Explanation:</strong> It is not possible to get non-negative product in the path from (0, 0) to (2, 2), so return -1.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/12/23/product2.jpg" style="width: 244px; height: 245px;">
<pre><strong>Input:</strong> grid = [[1,-2,1],[1,-2,1],[3,-4,1]]
<strong>Output:</strong> 8
<strong>Explanation:</strong> Maximum non-negative product is shown (1 * 1 * -2 * -4 * 1 = 8).
</pre>

<p><strong class="example">Example 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/12/23/product3.jpg" style="width: 164px; height: 165px;">
<pre><strong>Input:</strong> grid = [[1,3],[0,-4]]
<strong>Output:</strong> 0
<strong>Explanation:</strong> Maximum non-negative product is shown (1 * 0 * -4 = 0).
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 15</code></li>
	<li><code>-4 &lt;= grid[i][j] &lt;= 4</code></li>
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
const maxProductPath = function (grid) {
  const MODULO = 10 ** 9 + 7;
  const m = grid.length;
  const n = grid[0].length;
  let prevMax = Array.from({ length: n + 1 }, () => 1);
  let prevMin = Array.from({ length: n + 1 }, () => 1);

  for (let row = 0; row < m; row++) {
    const currentMax = new Array(n + 1).fill(1);
    const currentMin = new Array(n + 1).fill(1);

    for (let col = 0; col < n; col++) {
      const value = grid[row][col];
      const upMax = prevMax[col + 1] * value;
      const upMin = prevMin[col + 1] * value;
      const leftMax = currentMax[col] * value;
      const leftMin = currentMin[col] * value;
      const candidates = [];

      if (row === 0 && col === 0) {
        candidates.push(value);
      } else if (row === 0) {
        candidates.push(leftMax, leftMin);
      } else if (col === 0) {
        candidates.push(upMax, upMin);
      } else {
        candidates.push(upMax, upMin, leftMax, leftMin);
      }

      currentMax[col + 1] = Math.max(...candidates);
      currentMin[col + 1] = Math.min(...candidates);
    }

    prevMax = currentMax;
    prevMin = currentMin;
  }

  return Math.max(prevMax[n], -1) % MODULO;
};
```
