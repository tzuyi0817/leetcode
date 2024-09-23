# [329. Longest Increasing Path in a Matrix](https://leetcode.com/problems/longest-increasing-path-in-a-matrix)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an <code>m x n</code> integers <code>matrix</code>, return <em>the length of the longest increasing path in </em><code>matrix</code>.</p>

<p>From each cell, you can either move in four directions: left, right, up, or down. You <strong>may not</strong> move <strong>diagonally</strong> or move <strong>outside the boundary</strong> (i.e., wrap-around is not allowed).</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/05/grid1.jpg" style="width: 242px; height: 242px;">
<pre><strong>Input:</strong> matrix = [[9,9,4],[6,6,8],[2,1,1]]
<strong>Output:</strong> 4
<strong>Explanation:</strong> The longest increasing path is <code>[1, 2, 6, 9]</code>.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/27/tmp-grid.jpg" style="width: 253px; height: 253px;">
<pre><strong>Input:</strong> matrix = [[3,4,5],[3,2,6],[2,2,1]]
<strong>Output:</strong> 4
<strong>Explanation: </strong>The longest increasing path is <code>[3, 4, 5, 6]</code>. Moving diagonally is not allowed.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> matrix = [[1]]
<strong>Output:</strong> 1
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == matrix.length</code></li>
	<li><code>n == matrix[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 200</code></li>
	<li><code>0 &lt;= matrix[i][j] &lt;= 2<sup>31</sup> - 1</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Depth-First Search + Memoization`**
- Time complexity: <em>O(mn)</em>
- Space complexity: <em>O(mn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function(matrix) {
    const MIN_VALUE = Number.MIN_SAFE_INTEGER;
    const m = matrix.length;
    const n = matrix[0].length;
    const dp = Array(m).fill('').map(_ => Array(n).fill(MIN_VALUE));
    const dfsPath = (row, col, previous = MIN_VALUE, step = 0) => {
        if (row < 0 || col < 0 || row >= m || col >= n) return step;
        const value = matrix[row][col];

        if (previous >= value) return step;
        if (dp[row][col] > MIN_VALUE) return dp[row][col] + step;
        const left = dfsPath(row, col - 1, value, step + 1);
        const right = dfsPath(row, col + 1, value, step + 1);
        const up = dfsPath(row - 1, col, value, step + 1);
        const down = dfsPath(row + 1, col, value, step + 1);
        const maxStep = Math.max(left, right, up, down);

        dp[row][col] = maxStep - step;
        return maxStep;
    };
    let result = 0;

    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            const step = dfsPath(row, col);

            result = Math.max(step, result);
        }
    }
    return result;
};
```
