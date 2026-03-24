# [2906. Construct Product Matrix](https://leetcode.com/problems/construct-product-matrix)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a <strong>0-indexed</strong> 2D integer matrix <code><font face="monospace">grid</font></code><font face="monospace"> </font>of size <code>n * m</code>, we define a <strong>0-indexed</strong> 2D matrix <code>p</code> of size <code>n * m</code> as the <strong>product</strong> matrix of <code>grid</code> if the following condition is met:</p>

<ul>
	<li>Each element <code>p[i][j]</code> is calculated as the product of all elements in <code>grid</code> except for the element <code>grid[i][j]</code>. This product is then taken modulo <code><font face="monospace">12345</font></code>.</li>
</ul>

<p>Return <em>the product matrix of</em> <code><font face="monospace">grid</font></code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> grid = [[1,2],[3,4]]
<strong>Output:</strong> [[24,12],[8,6]]
<strong>Explanation:</strong> p[0][0] = grid[0][1] * grid[1][0] * grid[1][1] = 2 * 3 * 4 = 24
p[0][1] = grid[0][0] * grid[1][0] * grid[1][1] = 1 * 3 * 4 = 12
p[1][0] = grid[0][0] * grid[0][1] * grid[1][1] = 1 * 2 * 4 = 8
p[1][1] = grid[0][0] * grid[0][1] * grid[1][0] = 1 * 2 * 3 = 6
So the answer is [[24,12],[8,6]].</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> grid = [[12345],[2],[1]]
<strong>Output:</strong> [[2],[0],[0]]
<strong>Explanation:</strong> p[0][0] = grid[0][1] * grid[0][2] = 2 * 1 = 2.
p[0][1] = grid[0][0] * grid[0][2] = 12345 * 1 = 12345. 12345 % 12345 = 0. So p[0][1] = 0.
p[0][2] = grid[0][0] * grid[0][1] = 12345 * 2 = 24690. 24690 % 12345 = 0. So p[0][2] = 0.
So the answer is [[2],[0],[0]].</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n == grid.length&nbsp;&lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= m == grid[i].length&nbsp;&lt;= 10<sup>5</sup></code></li>
	<li><code>2 &lt;= n * m &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= grid[i][j] &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Prefix Sum`**

- Time complexity: <em>O(mn)</em>
- Space complexity: <em>O(mn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} grid
 * @return {number[][]}
 */
const constructProductMatrix = function (grid) {
  const MODULO = 12345;
  const m = grid.length;
  const n = grid[0].length;
  const prefixProduct = Array.from({ length: m * n }, () => 1);
  const result = Array.from({ length: m }, () => new Array(n).fill(0));
  let suffixProduct = 1;

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = grid[row][col];
      const pos = row * n + col;
      const prevProduct = prefixProduct[pos - 1] ?? 1;

      prefixProduct[pos] = (prevProduct * value) % MODULO;
    }
  }

  for (let row = m - 1; row >= 0; row--) {
    for (let col = n - 1; col >= 0; col--) {
      const value = grid[row][col];
      const pos = row * n + col;
      const prefix = prefixProduct[pos - 1] ?? 1;

      result[row][col] = (prefix * suffixProduct) % MODULO;
      suffixProduct = (suffixProduct * value) % MODULO;
    }
  }

  return result;
};
```
