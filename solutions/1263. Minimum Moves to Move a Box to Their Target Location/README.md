# [1263. Minimum Moves to Move a Box to Their Target Location](https://leetcode.com/problems/minimum-moves-to-move-a-box-to-their-target-location)

## Description

<div class="elfjS" data-track-load="description_content"><p>A storekeeper is a game in which the player pushes boxes around in a warehouse trying to get them to target locations.</p>

<p>The game is represented by an <code>m x n</code> grid of characters <code>grid</code> where each element is a wall, floor, or box.</p>

<p>Your task is to move the box <code>'B'</code> to the target position <code>'T'</code> under the following rules:</p>

<ul>
	<li>The character <code>'S'</code> represents the player. The player can move up, down, left, right in <code>grid</code> if it is a floor (empty cell).</li>
	<li>The character <code>'.'</code> represents the floor which means a free cell to walk.</li>
	<li>The character<font face="monospace">&nbsp;</font><code>'#'</code><font face="monospace">&nbsp;</font>represents the wall which means an obstacle (impossible to walk there).</li>
	<li>There is only one box <code>'B'</code> and one target cell <code>'T'</code> in the <code>grid</code>.</li>
	<li>The box can be moved to an adjacent free cell by standing next to the box and then moving in the direction of the box. This is a <strong>push</strong>.</li>
	<li>The player cannot walk through the box.</li>
</ul>

<p>Return <em>the minimum number of <strong>pushes</strong> to move the box to the target</em>. If there is no way to reach the target, return <code>-1</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2019/11/06/sample_1_1620.png" style="width: 500px; height: 335px;">
<pre><strong>Input:</strong> grid = [["#","#","#","#","#","#"],
               ["#","T","#","#","#","#"],
               ["#",".",".","B",".","#"],
               ["#",".","#","#",".","#"],
               ["#",".",".",".","S","#"],
               ["#","#","#","#","#","#"]]
<strong>Output:</strong> 3
<strong>Explanation:</strong> We return only the number of times the box is pushed.</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> grid = [["#","#","#","#","#","#"],
               ["#","T","#","#","#","#"],
               ["#",".",".","B",".","#"],
               ["#","#","#","#",".","#"],
               ["#",".",".",".","S","#"],
               ["#","#","#","#","#","#"]]
<strong>Output:</strong> -1
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> grid = [["#","#","#","#","#","#"],
               ["#","T",".",".","#","#"],
               ["#",".","#","B",".","#"],
               ["#",".",".",".",".","#"],
               ["#",".",".",".","S","#"],
               ["#","#","#","#","#","#"]]
<strong>Output:</strong> 5
<strong>Explanation:</strong> push the box down, left, left, up and up.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 20</code></li>
	<li><code>grid</code> contains only characters <code>'.'</code>, <code>'#'</code>, <code>'S'</code>, <code>'T'</code>, or <code>'B'</code>.</li>
	<li>There is only one character <code>'S'</code>, <code>'B'</code>, and <code>'T'</code> in the <code>grid</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Breadth-First Search`**

- Time complexity: <em>O(（mn)<sup>3</sup>)</em>
- Space complexity: <em>O(（mn)<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {character[][]} grid
 * @return {number}
 */
const minPushBox = function (grid) {
  const OBSTACLE = '#';
  const m = grid.length;
  const n = grid[0].length;
  const location = { player: null, box: null };

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = grid[row][col];

      if (value === 'S') location.player = { row, col };
      if (value === 'B') location.box = { row, col };
    }
  }
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const visited = new Set();
  let queue = [location];
  let result = 0;

  const isOutOfBounds = (row, col) => row >= m || col >= n || row < 0 || col < 0;
  const getVisitedKey = (box, player) => `${box.row},${box.col},${player.row},${player.col}`;

  const playerCanMoveTo = (start, target, box) => {
    if (start.row === target.row && start.col === target.col) return true;
    const memo = Array.from({ length: m * n }, () => false);
    let queue = [start];

    memo[start.row * n + start.col] = true;

    while (queue.length) {
      const nextQueue = [];

      for (const { row, col } of queue) {
        for (const [moveRow, moveCol] of directions) {
          const nextRow = row + moveRow;
          const nextCol = col + moveCol;
          const key = nextRow * n + nextCol;

          if (nextRow === target.row && nextCol === target.col) return true;
          if (isOutOfBounds(nextRow, nextCol) || memo[key]) continue;
          if (nextRow === box.row && nextCol === box.col) continue;
          if (grid[nextRow][nextCol] === OBSTACLE) continue;

          nextQueue.push({ row: nextRow, col: nextCol });
          memo[key] = true;
        }
      }
      queue = nextQueue;
    }
    return false;
  };

  visited.add(getVisitedKey(location.box, location.player));

  while (queue.length) {
    const nextQueue = [];

    result += 1;

    for (const { player, box } of queue) {
      for (const [moveRow, moveCol] of directions) {
        const nextRow = box.row + moveRow;
        const nextCol = box.col + moveCol;

        if (isOutOfBounds(nextRow, nextCol)) continue;
        const nextBox = { row: nextRow, col: nextCol };
        const boxCell = grid[nextRow][nextCol];

        if (boxCell === OBSTACLE) continue;
        const pushRow = box.row + moveRow * -1;
        const pushCol = box.col + moveCol * -1;

        if (isOutOfBounds(pushRow, pushCol)) continue;
        if (grid[pushRow][pushCol] === OBSTACLE) continue;
        const pushPosition = { row: pushRow, col: pushCol };
        const key = getVisitedKey(nextBox, pushPosition);

        if (visited.has(key)) continue;
        if (!playerCanMoveTo(player, pushPosition, box)) continue;
        if (boxCell === 'T') return result;

        nextQueue.push({ player: box, box: nextBox });
        visited.add(key);
      }
    }
    queue = nextQueue;
  }
  return -1;
};
```
