# [741. Cherry Pickup](https://leetcode.com/problems/cherry-pickup)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an <code>n x n</code> <code>grid</code> representing a field of cherries, each cell is one of three possible integers.</p>

<ul>
	<li><code>0</code> means the cell is empty, so you can pass through,</li>
	<li><code>1</code> means the cell contains a cherry that you can pick up and pass through, or</li>
	<li><code>-1</code> means the cell contains a thorn that blocks your way.</li>
</ul>

<p>Return <em>the maximum number of cherries you can collect by following the rules below</em>:</p>

<ul>
	<li>Starting at the position <code>(0, 0)</code> and reaching <code>(n - 1, n - 1)</code> by moving right or down through valid path cells (cells with value <code>0</code> or <code>1</code>).</li>
	<li>After reaching <code>(n - 1, n - 1)</code>, returning to <code>(0, 0)</code> by moving left or up through valid path cells.</li>
	<li>When passing through a path cell containing a cherry, you pick it up, and the cell becomes an empty cell <code>0</code>.</li>
	<li>If there is no valid path between <code>(0, 0)</code> and <code>(n - 1, n - 1)</code>, then no cherries can be collected.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/14/grid.jpg" style="width: 242px; height: 242px;">
<pre><strong>Input:</strong> grid = [[0,1,-1],[1,0,-1],[1,1,1]]
<strong>Output:</strong> 5
<strong>Explanation:</strong> The player started at (0, 0) and went down, down, right right to reach (2, 2).
4 cherries were picked up during this single trip, and the matrix becomes [[0,1,-1],[0,0,-1],[0,0,0]].
Then, the player went left, up, up, left to return home, picking up one more cherry.
The total number of cherries picked up is 5, and this is the maximum possible.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> grid = [[1,1,-1],[1,-1,1],[-1,1,1]]
<strong>Output:</strong> 0
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>1 &lt;= n &lt;= 50</code></li>
	<li><code>grid[i][j]</code> is <code>-1</code>, <code>0</code>, or <code>1</code>.</li>
	<li><code>grid[0][0] != -1</code></li>
	<li><code>grid[n - 1][n - 1] != -1</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**
- Time complexity: <em>O(n<sup>3</sup>)</em>
- Space complexity: <em>O(n<sup>3</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var cherryPickup = function(grid) {
    const n = grid.length;
    const dp = Array(n).fill('').map(_ => Array(n).fill('').map(_ => Array(n).fill(-1)));

    const cherryPick = (row1, col1, row2) => {
        const col2 = row1 + col1 - row2;

        if (row1 >= n || col1 >= n || row2 >= n || col2 >= n) return Number.MIN_SAFE_INTEGER;
        if (grid[row1][col1] === -1 || grid[row2][col2] === -1) return Number.MIN_SAFE_INTEGER;
        if (row1 === n - 1 && col1 === n - 1) return grid[row1][col1];
        if (dp[row1][col1][row2] !== -1) return dp[row1][col1][row2];

        let result = grid[row1][col1];

        if (row1 !== row2) result += grid[row2][col2];

        result += Math.max(
            cherryPick(row1 + 1, col1, row2),
            cherryPick(row1 + 1, col1, row2 + 1),
            cherryPick(row1, col1 + 1, row2),
            cherryPick(row1, col1 + 1, row2 + 1),
        );
        return dp[row1][col1][row2] = result;
    };

    return Math.max(cherryPick(0, 0, 0), 0);
};
```
