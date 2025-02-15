# [2812. Find the Safest Path in a Grid](https://leetcode.com/problems/find-the-safest-path-in-a-grid)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a <strong>0-indexed</strong> 2D matrix <code>grid</code> of size <code>n x n</code>, where <code>(r, c)</code> represents:</p>

<ul>
	<li>A cell containing a thief if <code>grid[r][c] = 1</code></li>
	<li>An empty cell if <code>grid[r][c] = 0</code></li>
</ul>

<p>You are initially positioned at cell <code>(0, 0)</code>. In one move, you can move to any adjacent cell in the grid, including cells containing thieves.</p>

<p>The <strong>safeness factor</strong> of a path on the grid is defined as the <strong>minimum</strong> manhattan distance from any cell in the path to any thief in the grid.</p>

<p>Return <em>the <strong>maximum safeness factor</strong> of all paths leading to cell </em><code>(n - 1, n - 1)</code><em>.</em></p>

<p>An <strong>adjacent</strong> cell of cell <code>(r, c)</code>, is one of the cells <code>(r, c + 1)</code>, <code>(r, c - 1)</code>, <code>(r + 1, c)</code> and <code>(r - 1, c)</code> if it exists.</p>

<p>The <strong>Manhattan distance</strong> between two cells <code>(a, b)</code> and <code>(x, y)</code> is equal to <code>|a - x| + |b - y|</code>, where <code>|val|</code> denotes the absolute value of val.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2023/07/02/example1.png" style="width: 362px; height: 242px;">
<pre><strong>Input:</strong> grid = [[1,0,0],[0,0,0],[0,0,1]]
<strong>Output:</strong> 0
<strong>Explanation:</strong> All paths from (0, 0) to (n - 1, n - 1) go through the thieves in cells (0, 0) and (n - 1, n - 1).
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2023/07/02/example2.png" style="width: 362px; height: 242px;">
<pre><strong>Input:</strong> grid = [[0,0,1],[0,0,0],[0,0,0]]
<strong>Output:</strong> 2
<strong>Explanation:</strong> The path depicted in the picture above has a safeness factor of 2 since:
- The closest cell of the path to the thief at cell (0, 2) is cell (0, 0). The distance between them is | 0 - 0 | + | 0 - 2 | = 2.
It can be shown that there are no other paths with a higher safeness factor.
</pre>

<p><strong class="example">Example 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2023/07/02/example3.png" style="width: 362px; height: 242px;">
<pre><strong>Input:</strong> grid = [[0,0,0,1],[0,0,0,0],[0,0,0,0],[1,0,0,0]]
<strong>Output:</strong> 2
<strong>Explanation:</strong> The path depicted in the picture above has a safeness factor of 2 since:
- The closest cell of the path to the thief at cell (0, 3) is cell (1, 2). The distance between them is | 0 - 1 | + | 3 - 2 | = 2.
- The closest cell of the path to the thief at cell (3, 0) is cell (3, 2). The distance between them is | 3 - 3 | + | 0 - 2 | = 2.
It can be shown that there are no other paths with a higher safeness factor.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= grid.length == n &lt;= 400</code></li>
	<li><code>grid[i].length == n</code></li>
	<li><code>grid[i][j]</code> is either <code>0</code> or <code>1</code>.</li>
	<li>There is at least one thief in the <code>grid</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Breadth-First Search`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
const maximumSafenessFactor = function (grid) {
  const n = grid.length;
  const distances = new Array(n)
    .fill('')
    .map(_ => new Array(n).fill(Number.MAX_SAFE_INTEGER));
  const safeness = new Array(n)
    .fill('')
    .map(_ => new Array(n).fill(0));
  const moves = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const isOutOfBounds = (row, col) => row >= n || col >= n || row < 0 || col < 0;
  let queue = [];

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (!grid[row][col]) continue;
      distances[row][col] = 0;
      queue.push({ row, col });
    }
  }
  while (queue.length) {
    const nextQueue = [];

    for (const { row, col } of queue) {
      const distance = distances[row][col];

      for (const [moveRow, moveCol] of moves) {
        const nextRow = row + moveRow;
        const nextCol = col + moveCol;

        if (isOutOfBounds(nextRow, nextCol)) continue;
        if (distances[nextRow][nextCol] !== Number.MAX_SAFE_INTEGER) continue;
        distances[nextRow][nextCol] = distance + 1;
        nextQueue.push({ row: nextRow, col: nextCol });
      }
    }
    queue = nextQueue;
  }
  safeness[0][0] = distances[0][0];
  queue.push({ row: 0, col: 0 });

  while (queue.length) {
    const nextQueue = [];

    for (const { row, col } of queue) {
      for (const [moveRow, moveCol] of moves) {
        const nextRow = row + moveRow;
        const nextCol = col + moveCol;

        if (isOutOfBounds(nextRow, nextCol)) continue;
        const distance = Math.min(distances[nextRow][nextCol], safeness[row][col]);

        if (distance <= safeness[nextRow][nextCol]) continue;
        safeness[nextRow][nextCol] = distance;
        nextQueue.push({ row: nextRow, col: nextCol });
      }
    }
    queue = nextQueue;
  }
  return safeness[n - 1][n - 1];
};
```
