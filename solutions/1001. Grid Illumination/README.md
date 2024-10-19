# [1001. Grid Illumination](https://leetcode.com/problems/grid-illumination)

## Description

<div class="elfjS" data-track-load="description_content"><p>There is a 2D <code>grid</code> of size <code>n x n</code> where each cell of this grid has a lamp that is initially <strong>turned off</strong>.</p>

<p>You are given a 2D array of lamp positions <code>lamps</code>, where <code>lamps[i] = [row<sub>i</sub>, col<sub>i</sub>]</code> indicates that the lamp at <code>grid[row<sub>i</sub>][col<sub>i</sub>]</code> is <strong>turned on</strong>. Even if the same lamp is listed more than once, it is turned on.</p>

<p>When a lamp is turned on, it <strong>illuminates its cell</strong> and <strong>all other cells</strong> in the same <strong>row, column, or diagonal</strong>.</p>

<p>You are also given another 2D array <code>queries</code>, where <code>queries[j] = [row<sub>j</sub>, col<sub>j</sub>]</code>. For the <code>j<sup>th</sup></code> query, determine whether <code>grid[row<sub>j</sub>][col<sub>j</sub>]</code> is illuminated or not. After answering the <code>j<sup>th</sup></code> query, <strong>turn off</strong> the lamp at <code>grid[row<sub>j</sub>][col<sub>j</sub>]</code> and its <strong>8 adjacent lamps</strong> if they exist. A lamp is adjacent if its cell shares either a side or corner with <code>grid[row<sub>j</sub>][col<sub>j</sub>]</code>.</p>

<p>Return <em>an array of integers </em><code>ans</code><em>,</em><em> where </em><code>ans[j]</code><em> should be </em><code>1</code><em> if the cell in the </em><code>j<sup>th</sup></code><em> query was illuminated, or </em><code>0</code><em> if the lamp was not.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/08/19/illu_1.jpg" style="width: 750px; height: 209px;">
<pre><strong>Input:</strong> n = 5, lamps = [[0,0],[4,4]], queries = [[1,1],[1,0]]
<strong>Output:</strong> [1,0]
<strong>Explanation:</strong> We have the initial grid with all lamps turned off. In the above picture we see the grid after turning on the lamp at grid[0][0] then turning on the lamp at grid[4][4].
The 0<sup>th</sup>&nbsp;query asks if the lamp at grid[1][1] is illuminated or not (the blue square). It is illuminated, so set ans[0] = 1. Then, we turn off all lamps in the red square.
<img alt="" src="https://assets.leetcode.com/uploads/2020/08/19/illu_step1.jpg" style="width: 500px; height: 218px;">
The 1<sup>st</sup>&nbsp;query asks if the lamp at grid[1][0] is illuminated or not (the blue square). It is not illuminated, so set ans[1] = 0. Then, we turn off all lamps in the red rectangle.
<img alt="" src="https://assets.leetcode.com/uploads/2020/08/19/illu_step2.jpg" style="width: 500px; height: 219px;">
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 5, lamps = [[0,0],[4,4]], queries = [[1,1],[1,1]]
<strong>Output:</strong> [1,1]
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> n = 5, lamps = [[0,0],[0,4]], queries = [[0,4],[0,1],[1,4]]
<strong>Output:</strong> [1,1,0]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 10<sup>9</sup></code></li>
	<li><code>0 &lt;= lamps.length &lt;= 20000</code></li>
	<li><code>0 &lt;= queries.length &lt;= 20000</code></li>
	<li><code>lamps[i].length == 2</code></li>
	<li><code>0 &lt;= row<sub>i</sub>, col<sub>i</sub> &lt; n</code></li>
	<li><code>queries[j].length == 2</code></li>
	<li><code>0 &lt;= row<sub>j</sub>, col<sub>j</sub> &lt; n</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n<sup>3</sup>/k)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number[][]} lamps
 * @param {number[][]} queries
 * @return {number[]}
 */
var gridIllumination = function (n, lamps, queries) {
  const lampsSet = new Set();
  const rowMemo = new Map();
  const colMemo = new Map();
  const diagonalMemo = new Map();
  const negativeDiagonalMemo = new Map();
  const adjacent = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 0],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (const [row, col] of lamps) {
    const key = `${row},${col}`;

    if (lampsSet.has(key)) continue;
    lampsSet.add(key);
    rowMemo.set(row, (rowMemo.get(row) ?? 0) + 1);
    colMemo.set(col, (colMemo.get(col) ?? 0) + 1);
    diagonalMemo.set(row + col, (diagonalMemo.get(row + col) ?? 0) + 1);
    negativeDiagonalMemo.set(row - col, (negativeDiagonalMemo.get(row - col) ?? 0) + 1);
  }

  return queries.map(([row, col]) => {
    const isIllumination =
      rowMemo.get(row) || colMemo.get(col) || diagonalMemo.get(row + col) || negativeDiagonalMemo.get(row - col);

    for (const offset of adjacent) {
      const offsetRow = row + offset[0];
      const offsetCol = col + offset[1];
      const key = `${offsetRow},${offsetCol}`;

      if (offsetRow < 0 || offsetRow >= n || offsetCol < 0 || offsetCol >= n) continue;
      if (!lampsSet.has(key)) continue;
      const rowCount = rowMemo.get(offsetRow) - 1;
      const colCount = colMemo.get(offsetCol) - 1;
      const diagonalCount = diagonalMemo.get(offsetRow + offsetCol) - 1;
      const negativeDiagonalCount = negativeDiagonalMemo.get(offsetRow - offsetCol) - 1;

      rowCount ? rowMemo.set(offsetRow, rowCount) : rowMemo.delete(offsetRow);
      colCount ? colMemo.set(offsetCol, colCount) : colMemo.delete(offsetCol);

      diagonalCount
        ? diagonalMemo.set(offsetRow + offsetCol, diagonalCount)
        : diagonalMemo.delete(offsetRow + offsetCol);

      negativeDiagonalCount
        ? negativeDiagonalMemo.set(offsetRow - offsetCol, negativeDiagonalCount)
        : negativeDiagonalMemo.delete(offsetRow - offsetCol);

      lampsSet.delete(key);
    }

    return isIllumination ? 1 : 0;
  });
};
```
