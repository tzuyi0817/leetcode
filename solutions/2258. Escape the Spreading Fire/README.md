# [2258. Escape the Spreading Fire](https://leetcode.com/problems/escape-the-spreading-fire)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a <strong>0-indexed</strong> 2D integer array <code>grid</code> of size <code>m x n</code> which represents a field. Each cell has one of three values:</p>

<ul>
	<li><code>0</code> represents grass,</li>
	<li><code>1</code> represents fire,</li>
	<li><code>2</code> represents a wall that you and fire cannot pass through.</li>
</ul>

<p>You are situated in the top-left cell, <code>(0, 0)</code>, and you want to travel to the safehouse at the bottom-right cell, <code>(m - 1, n - 1)</code>. Every minute, you may move to an <strong>adjacent</strong> grass cell. <strong>After</strong> your move, every fire cell will spread to all <strong>adjacent</strong> cells that are not walls.</p>

<p>Return <em>the <strong>maximum</strong> number of minutes that you can stay in your initial position before moving while still safely reaching the safehouse</em>. If this is impossible, return <code>-1</code>. If you can <strong>always</strong> reach the safehouse regardless of the minutes stayed, return <code>10<sup>9</sup></code>.</p>

<p>Note that even if the fire spreads to the safehouse immediately after you have reached it, it will be counted as safely reaching the safehouse.</p>

<p>A cell is <strong>adjacent</strong> to another cell if the former is directly north, east, south, or west of the latter (i.e., their sides are touching).</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/03/10/ex1new.jpg" style="width: 650px; height: 404px;">
<pre><strong>Input:</strong> grid = [[0,2,0,0,0,0,0],[0,0,0,2,2,1,0],[0,2,0,0,1,2,0],[0,0,2,2,2,0,2],[0,0,0,0,0,0,0]]
<strong>Output:</strong> 3
<strong>Explanation:</strong> The figure above shows the scenario where you stay in the initial position for 3 minutes.
You will still be able to safely reach the safehouse.
Staying for more than 3 minutes will not allow you to safely reach the safehouse.</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/03/10/ex2new2.jpg" style="width: 515px; height: 150px;">
<pre><strong>Input:</strong> grid = [[0,0,0,0],[0,1,2,0],[0,2,0,0]]
<strong>Output:</strong> -1
<strong>Explanation:</strong> The figure above shows the scenario where you immediately move towards the safehouse.
Fire will spread to any cell you move towards and it is impossible to safely reach the safehouse.
Thus, -1 is returned.
</pre>

<p><strong class="example">Example 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/03/10/ex3new.jpg" style="width: 174px; height: 150px;">
<pre><strong>Input:</strong> grid = [[0,0,0],[2,2,0],[1,2,0]]
<strong>Output:</strong> 1000000000
<strong>Explanation:</strong> The figure above shows the initial grid.
Notice that the fire is contained by walls and you will always be able to safely reach the safehouse.
Thus, 10<sup>9</sup> is returned.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>2 &lt;= m, n &lt;= 300</code></li>
	<li><code>4 &lt;= m * n &lt;= 2 * 10<sup>4</sup></code></li>
	<li><code>grid[i][j]</code> is either <code>0</code>, <code>1</code>, or <code>2</code>.</li>
	<li><code>grid[0][0] == grid[m - 1][n - 1] == 0</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Breadth-First Search + Binary Search`**

- Time complexity: <em>O(mnlogmn)</em>
- Space complexity: <em>O(mn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
const maximumMinutes = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const MAX_MINUTES = m * n;
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const spreadGrid = Array.from({ length: m }, () => new Array(n).fill(Number.MAX_SAFE_INTEGER));
  let fireQueue = [];
  let left = 0;
  let right = MAX_MINUTES;
  let result = -1;

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = grid[row][col];

      if (value === 1) {
        spreadGrid[row][col] = 0;
        fireQueue.push({ row, col, minutes: 0 });
      }
    }
  }

  while (fireQueue.length) {
    const nextQueue = [];

    for (const { row, col, minutes } of fireQueue) {
      for (const [moveRow, moveCol] of directions) {
        const nextRow = row + moveRow;
        const nextCol = col + moveCol;

        if (nextRow < 0 || nextCol < 0 || nextRow >= m || nextCol >= n) continue;
        if (grid[nextRow][nextCol] === 2) continue;

        const originMinutes = spreadGrid[nextRow][nextCol];
        const nextMinutes = minutes + 1;

        if (originMinutes <= nextMinutes) continue;

        spreadGrid[nextRow][nextCol] = nextMinutes;
        nextQueue.push({ row: nextRow, col: nextCol, minutes: nextMinutes });
      }
    }

    fireQueue = nextQueue;
  }

  const isPossibleEscape = stayMinutes => {
    if (stayMinutes >= spreadGrid[0][0]) return false;

    const visited = new Array(m)
      .fill('')
      .map(() => new Array(n).fill(false));
    let queue = [{ row: 0, col: 0, minutes: stayMinutes }];

    visited[0][0] = true;

    while (queue.length) {
      const nextQueue = [];

      for (const { row, col, minutes } of queue) {
        for (const [moveRow, moveCol] of directions) {
          const nextRow = row + moveRow;
          const nextCol = col + moveCol;

          if (nextRow < 0 || nextCol < 0 || nextRow >= m || nextCol >= n) continue;
          if (grid[nextRow][nextCol] === 2 || visited[nextRow][nextCol]) continue;

          const nextMinutes = minutes + 1;
          const spreadMinutes = spreadGrid[nextRow][nextCol];

          if (nextRow === m - 1 && nextCol === n - 1) {
            if (nextMinutes > spreadMinutes) continue;

            return true;
          } else if (nextMinutes >= spreadMinutes) {
            continue;
          }

          visited[nextRow][nextCol] = true;
          nextQueue.push({ row: nextRow, col: nextCol, minutes: nextMinutes });
        }
      }

      queue = nextQueue;
    }

    return false;
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (isPossibleEscape(mid)) {
      result = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result === MAX_MINUTES ? 10 ** 9 : result;
};
```
