# [3212. Count Submatrices With Equal Frequency of X and Y](https://leetcode.com/problems/count-submatrices-with-equal-frequency-of-x-and-y)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a 2D character matrix <code>grid</code>, where <code>grid[i][j]</code> is either <code>'X'</code>, <code>'Y'</code>, or <code>'.'</code>, return the number of <span data-keyword="submatrix" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r1k:" data-state="closed" class="">submatrices</button></span> that contain:</p>

<ul>
	<li><code>grid[0][0]</code></li>
	<li>an <strong>equal</strong> frequency of <code>'X'</code> and <code>'Y'</code>.</li>
	<li><strong>at least</strong> one <code>'X'</code>.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">grid = [["X","Y","."],["Y",".","."]]</span></p>

<p><strong>Output:</strong> <span class="example-io">3</span></p>

<p><strong>Explanation:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2024/06/07/examplems.png" style="padding: 10px; background: rgb(255, 255, 255); border-radius: 0.5rem; width: 175px; height: 350px;"></strong></p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">grid = [["X","X"],["X","Y"]]</span></p>

<p><strong>Output:</strong> <span class="example-io">0</span></p>

<p><strong>Explanation:</strong></p>

<p>No submatrix has an equal frequency of <code>'X'</code> and <code>'Y'</code>.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">grid = [[".","."],[".","."]]</span></p>

<p><strong>Output:</strong> <span class="example-io">0</span></p>

<p><strong>Explanation:</strong></p>

<p>No submatrix has at least one <code>'X'</code>.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= grid.length, grid[i].length &lt;= 1000</code></li>
	<li><code>grid[i][j]</code> is either <code>'X'</code>, <code>'Y'</code>, or <code>'.'</code>.</li>
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
 * @param {character[][]} grid
 * @return {number}
 */
const numberOfSubmatrices = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  let prevRowX = Array.from({ length: n }, () => 0);
  let prevRowY = Array.from({ length: n }, () => 0);
  let result = 0;

  for (let row = 0; row < m; row++) {
    const currentRowX = new Array(n).fill(0);
    const currentRowY = new Array(n).fill(0);

    for (let col = 0; col < n; col++) {
      const value = grid[row][col];
      const topX = prevRowX[col];
      const leftX = currentRowX[col - 1] ?? 0;
      const cornerX = prevRowX[col - 1] ?? 0;
      const topY = prevRowY[col];
      const leftY = currentRowY[col - 1] ?? 0;
      const cornerY = prevRowY[col - 1] ?? 0;

      currentRowX[col] = topX + leftX - cornerX + (value === 'X' ? 1 : 0);
      currentRowY[col] = topY + leftY - cornerY + (value === 'Y' ? 1 : 0);

      if (currentRowX[col] && currentRowX[col] === currentRowY[col]) {
        result += 1;
      }
    }

    prevRowX = currentRowX;
    prevRowY = currentRowY;
  }

  return result;
};
```
