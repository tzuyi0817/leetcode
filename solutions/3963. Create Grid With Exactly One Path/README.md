# [3963. Create Grid With Exactly One Path](https://leetcode.com/problems/create-grid-with-exactly-one-path)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>You are given two integers <code>m</code> and <code>n</code>, representing the number of rows and columns of a grid.</p>

<p>Construct <strong>any</strong> <code>m x n</code> grid consisting only of the characters <code>'.'</code> and <code>'#'</code>, where:</p>

<ul>
	<li><code>'.'</code> represents a free cell.</li>
	<li><code>'#'</code> represents an obstacle cell.</li>
</ul>

<p>A <strong>valid path</strong> is a sequence of free cells that:</p>

<ul>
	<li>Starts at the top-left cell <code>(0, 0)</code>.</li>
	<li>Ends at the bottom-right cell <code>(m - 1, n - 1)</code>.</li>
	<li>Moves only:
	<ul>
		<li>Right, from <code>(i, j)</code> to <code>(i, j + 1)</code>, or</li>
		<li>Down, from <code>(i, j)</code> to <code>(i + 1, j)</code>.</li>
	</ul>
	</li>
</ul>

<p>Return any grid such that there is <strong>exactly one valid path</strong> from the top-left cell to the bottom-right cell.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">m = 2, n = 3</span></p>

<p><strong>Output:</strong> <span class="example-io">["..#","#.."]</span></p>

<p><strong>Explanation:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2026/05/26/screenshot-2026-05-26-at-61005pm.png" style="width: 200px; height: 95px;"></p>

<p>The only valid path is: <code>(0,0) → (0,1) → (1,1) → (1,2)</code></p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">m = 3, n = 3</span></p>

<p><strong>Output:</strong> <span class="example-io">["..#","#..","##."]</span></p>

<p><strong>Explanation:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2026/05/26/screenshot-2026-05-26-at-61129pm.png" style="width: 220px; height: 150px;"></p>

<p>The only valid path is: <code>(0,0) → (0,1) → (1,1) → (1,2) → (2,2)</code></p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">m = 1, n = 4</span></p>

<p><strong>Output:</strong> <span class="example-io">["...."]</span></p>

<p><strong>Explanation:</strong></p>

<p>The only valid path is: <code>(0,0) → (0,1) → (0,2) → (0,3)</code></p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= m, n &lt;= 25</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Simulation`**

- Time complexity: <em>O(m+n)</em>
- Space complexity: <em>O(mn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} m
 * @param {number} n
 * @return {string[]}
 */
const createGrid = function (m, n) {
  const grid = Array.from({ length: m }, () => new Array(n).fill('#'));

  for (let row = 0; row < m; row++) {
    grid[row][0] = '.';
  }

  for (let col = 0; col < n; col++) {
    grid[m - 1][col] = '.';
  }

  return grid.map(row => row.join(''));
};
```
