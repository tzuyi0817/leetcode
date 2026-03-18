# [3070. Count Submatrices with Top-Left Element and Sum Less Than k](https://leetcode.com/problems/count-submatrices-with-top-left-element-and-sum-less-than-k)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a <strong>0-indexed</strong> integer matrix <code>grid</code> and an integer <code>k</code>.</p>

<p>Return <em>the <strong>number</strong> of <span data-keyword="submatrix" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r1k:" data-state="closed" class="">submatrices</button></span> that contain the top-left element of the</em> <code>grid</code>, <em>and have a sum less than or equal to </em><code>k</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2024/01/01/example1.png" style="padding: 10px; background: rgb(255, 255, 255); border-radius: 0.5rem;">
<pre><strong>Input:</strong> grid = [[7,6,3],[6,6,1]], k = 18
<strong>Output:</strong> 4
<strong>Explanation:</strong> There are only 4 submatrices, shown in the image above, that contain the top-left element of grid, and have a sum less than or equal to 18.</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2024/01/01/example21.png" style="padding: 10px; background: rgb(255, 255, 255); border-radius: 0.5rem;">
<pre><strong>Input:</strong> grid = [[7,2,9],[1,5,0],[2,6,6]], k = 20
<strong>Output:</strong> 6
<strong>Explanation:</strong> There are only 6 submatrices, shown in the image above, that contain the top-left element of grid, and have a sum less than or equal to 20.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == grid.length </code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>1 &lt;= n, m &lt;= 1000 </code></li>
	<li><code>0 &lt;= grid[i][j] &lt;= 1000</code></li>
	<li><code>1 &lt;= k &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Prefix Sum`**

- Time complexity: <em>O(mn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
const countSubmatrices = function (grid, k) {
  const m = grid.length;
  const n = grid[0].length;
  let preRowSum = Array.from({ length: n }, () => 0);
  let result = 0;

  for (let row = 0; row < m; row++) {
    const currentRow = new Array(n).fill(0);

    for (let col = 0; col < n; col++) {
      const value = grid[row][col];
      const topSum = preRowSum[col];
      const leftSum = currentRow[col - 1] ?? 0;
      const cornerSum = preRowSum[col - 1] ?? 0;
      const sum = value + topSum + leftSum - cornerSum;

      currentRow[col] = sum;

      if (sum <= k) {
        result += 1;
      }
    }

    preRowSum = currentRow;
  }

  return result;
};
```
