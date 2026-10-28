# [3882. Minimum XOR Path in a Grid](https://leetcode.com/problems/minimum-xor-path-in-a-grid)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>You are given a 2D integer array <code>grid</code> of size <code>m * n</code>.</p>

<p>You start at the <strong>top-left</strong> cell <code>(0, 0)</code> and want to reach the <strong>bottom-right</strong> cell <code>(m - 1, n - 1)</code>.</p>

<p>At each step, you <strong>may</strong> move either <strong>right or down</strong>.</p>

<p>The <strong>cost</strong> of a path is defined as the <strong>bitwise XOR</strong> of all the values in the cells along that path, <strong>including</strong> the start and end cells.</p>

<p>Return the <strong>minimum</strong> possible XOR value among all valid paths from <code>(0, 0)</code> to <code>(m - 1, n - 1)</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">grid = [[1,2],[3,4]]</span></p>

<p><strong>Output:</strong> <span class="example-io">6</span></p>

<p><strong>Explanation:</strong></p>

<p>There are two valid paths:</p>

<ul>
	<li><code>(0, 0) → (0, 1) → (1, 1)</code> with XOR: <code>1 XOR 2 XOR 4 = 7</code></li>
	<li><code>(0, 0) → (1, 0) → (1, 1)</code> with XOR: <code>1 XOR 3 XOR 4 = 6</code></li>
</ul>

<p>The minimum XOR value among all valid paths is 6.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">grid = [[6,7],[5,8]]</span></p>

<p><strong>Output:</strong> <span class="example-io">9</span></p>

<p><strong>Explanation:</strong></p>

<p>There are two valid paths:</p>

<ul>
	<li><code>(0, 0) → (0, 1) → (1, 1)</code> with XOR: <code>6 XOR 7 XOR 8 = 9</code></li>
	<li><code>(0, 0) → (1, 0) → (1, 1)</code> with XOR: <code>6 XOR 5 XOR 8 = 11</code></li>
</ul>

<p>The minimum XOR value among all valid paths is 9.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">grid = [[2,7,5]]</span></p>

<p><strong>Output:</strong> <span class="example-io">0</span></p>

<p><strong>Explanation:</strong></p>

<p>There is only one valid path:</p>

<ul>
	<li><code>(0, 0) → (0, 1) → (0, 2)</code> with XOR: <code>2 XOR 7 XOR 5 = 0</code></li>
</ul>

<p>The XOR value of this path is 0, which is the minimum possible.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= m == grid.length &lt;= 1000</code></li>
	<li><code>1 &lt;= n == grid[i].length &lt;= 1000</code></li>
	<li><code>m * n &lt;= 1000</code></li>
	<li><code>0 &lt;= grid[i][j] &lt;= 1023​</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(mn\*Max(grid))</em>
- Space complexity: <em>O(mn\*Max(grid))</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
const minCost = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const maxValue = Math.max(...grid.map(row => Math.max(...row)));
  const maxBit = 32 - Math.clz32(maxValue);
  const maxMask = (1 << maxBit) - 1;
  const dp = Array.from({ length: m * n }, () => {
    return new Array(maxMask + 1).fill(-1);
  });

  const getMinXor = (row, col, mask) => {
    if (row >= m || col >= n) return Number.MAX_SAFE_INTEGER;

    const cell = row * n + col;

    if (dp[cell][mask] !== -1) return dp[cell][mask];

    const value = grid[row][col];
    const nextMask = mask ^ value;

    if (row === m - 1 && col === n - 1) return nextMask;

    const downXor = getMinXor(row + 1, col, nextMask);
    const rightXor = getMinXor(row, col + 1, nextMask);
    const result = Math.min(downXor, rightXor);

    dp[cell][mask] = result;

    return result;
  };

  return getMinXor(0, 0, 0);
};
```
