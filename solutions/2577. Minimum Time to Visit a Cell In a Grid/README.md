# [2577. Minimum Time to Visit a Cell In a Grid](https://leetcode.com/problems/minimum-time-to-visit-a-cell-in-a-grid)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a <code>m x n</code> matrix <code>grid</code> consisting of <b>non-negative</b> integers where <code>grid[row][col]</code> represents the <strong>minimum</strong> time required to be able to visit the cell <code>(row, col)</code>, which means you can visit the cell <code>(row, col)</code> only when the time you visit it is greater than or equal to <code>grid[row][col]</code>.</p>

<p>You are standing in the <strong>top-left</strong> cell of the matrix in the <code>0<sup>th</sup></code> second, and you must move to <strong>any</strong> adjacent cell in the four directions: up, down, left, and right. Each move you make takes 1 second.</p>

<p>Return <em>the <strong>minimum</strong> time required in which you can visit the bottom-right cell of the matrix</em>. If you cannot visit the bottom-right cell, then return <code>-1</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2023/02/14/yetgriddrawio-8.png"></p>

<pre><strong>Input:</strong> grid = [[0,1,3,2],[5,1,2,5],[4,3,8,6]]
<strong>Output:</strong> 7
<strong>Explanation:</strong> One of the paths that we can take is the following:
- at t = 0, we are on the cell (0,0).
- at t = 1, we move to the cell (0,1). It is possible because grid[0][1] &lt;= 1.
- at t = 2, we move to the cell (1,1). It is possible because grid[1][1] &lt;= 2.
- at t = 3, we move to the cell (1,2). It is possible because grid[1][2] &lt;= 3.
- at t = 4, we move to the cell (1,1). It is possible because grid[1][1] &lt;= 4.
- at t = 5, we move to the cell (1,2). It is possible because grid[1][2] &lt;= 5.
- at t = 6, we move to the cell (1,3). It is possible because grid[1][3] &lt;= 6.
- at t = 7, we move to the cell (2,3). It is possible because grid[2][3] &lt;= 7.
The final time is 7. It can be shown that it is the minimum time possible.
</pre>

<p><strong class="example">Example 2:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2023/02/14/yetgriddrawio-9.png" style="width: 151px; height: 151px;"></p>

<pre><strong>Input:</strong> grid = [[0,2,4],[3,2,1],[1,0,4]]
<strong>Output:</strong> -1
<strong>Explanation:</strong> There is no path from the top left to the bottom-right cell.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>2 &lt;= m, n &lt;= 1000</code></li>
	<li><code>4 &lt;= m * n &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= grid[i][j] &lt;= 10<sup>5</sup></code></li>
	<li><code>grid[0][0] == 0</code></li>
</ul>

<p>&nbsp;</p>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Breadth-First Search + Priority Queue`**

- Time complexity: <em>O(mnlogmn)</em>
- Space complexity: <em>O(mn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
const minimumTime = function (grid) {
  if (grid[0][1] > 1 && grid[1][0] > 1) return -1;
  const m = grid.length;
  const n = grid[0].length;
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const visited = Array.from({ length: m }, () => Array.from({ length: n }, () => false));
  const queue = new MinPriorityQueue({ priority: ({ time }) => time });

  queue.enqueue({ row: 0, col: 0, time: 0 });
  visited[0][0] = true;

  while (queue.size()) {
    const { row, col, time } = queue.dequeue().element;

    if (row === m - 1 && col === n - 1) return time;

    for (const [moveRow, moveCol] of directions) {
      const nextRow = row + moveRow;
      const nextCol = col + moveCol;

      if (nextRow >= m || nextCol >= n || nextRow < 0 || nextCol < 0) continue;
      if (visited[nextRow][nextCol]) continue;
      const value = grid[nextRow][nextCol];
      const roundTripTime = value + ((value - time) % 2 ? 0 : 1);
      const nextTime = Math.max(time + 1, roundTripTime);

      queue.enqueue({ row: nextRow, col: nextCol, time: nextTime });
      visited[nextRow][nextCol] = true;
    }
  }
  return -1;
};
```
