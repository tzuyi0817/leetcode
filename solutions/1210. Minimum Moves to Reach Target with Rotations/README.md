# [1210. Minimum Moves to Reach Target with Rotations](https://leetcode.com/problems/minimum-moves-to-reach-target-with-rotations)

## Description

<div class="elfjS" data-track-load="description_content"><p>In an&nbsp;<code>n*n</code>&nbsp;grid, there is a snake that spans 2 cells and starts moving from the top left corner at <code>(0, 0)</code> and <code>(0, 1)</code>. The grid has empty cells represented by zeros and blocked cells represented by ones. The snake wants to reach the lower right corner at&nbsp;<code>(n-1, n-2)</code>&nbsp;and&nbsp;<code>(n-1, n-1)</code>.</p>

<p>In one move the snake can:</p>

<ul>
	<li>Move one cell to the right&nbsp;if there are no blocked cells there. This move keeps the horizontal/vertical position of the snake as it is.</li>
	<li>Move down one cell&nbsp;if there are no blocked cells there. This move keeps the horizontal/vertical position of the snake as it is.</li>
	<li>Rotate clockwise if it's in a horizontal position and the two cells under it are both empty. In that case the snake moves from&nbsp;<code>(r, c)</code>&nbsp;and&nbsp;<code>(r, c+1)</code>&nbsp;to&nbsp;<code>(r, c)</code>&nbsp;and&nbsp;<code>(r+1, c)</code>.<br>
	<img alt="" src="https://assets.leetcode.com/uploads/2019/09/24/image-2.png" style="width: 300px; height: 134px;"></li>
	<li>Rotate counterclockwise&nbsp;if it's in a vertical position and the two cells to its right are both empty. In that case the snake moves from&nbsp;<code>(r, c)</code>&nbsp;and&nbsp;<code>(r+1, c)</code>&nbsp;to&nbsp;<code>(r, c)</code>&nbsp;and&nbsp;<code>(r, c+1)</code>.<br>
	<img alt="" src="https://assets.leetcode.com/uploads/2019/09/24/image-1.png" style="width: 300px; height: 121px;"></li>
</ul>

<p>Return the minimum number of moves to reach the target.</p>

<p>If there is no way to reach the target, return&nbsp;<code>-1</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2019/09/24/image.png" style="width: 400px; height: 439px;"></strong></p>

<pre><strong>Input:</strong> grid = [[0,0,0,0,0,1],
               [1,1,0,0,1,0],
&nbsp;              [0,0,0,0,1,1],
&nbsp;              [0,0,1,0,1,0],
&nbsp;              [0,1,1,0,0,0],
&nbsp;              [0,1,1,0,0,0]]
<strong>Output:</strong> 11
<strong>Explanation:
</strong>One possible solution is [right, right, rotate clockwise, right, down, down, down, down, rotate counterclockwise, right, down].
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> grid = [[0,0,1,1,1,1],
&nbsp;              [0,0,0,0,1,1],
&nbsp;              [1,1,0,0,0,1],
&nbsp;              [1,1,1,0,0,1],
&nbsp;              [1,1,1,0,0,1],
&nbsp;              [1,1,1,0,0,0]]
<strong>Output:</strong> 9
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= n &lt;= 100</code></li>
	<li><code>0 &lt;= grid[i][j] &lt;= 1</code></li>
	<li>It is guaranteed that the snake starts at empty cells.</li>
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
const minimumMoves = function (grid) {
  const n = grid.length;
  const visited = new Set(['true,0,1']);
  let queue = [{ isHorizontal: true, snake: [0, 1] }];
  let result = 0;

  const isReach = (head, isHorizontal) => {
    return isHorizontal && head[0] === n - 1 && head[1] === n - 1;
  };

  const moveRight = (head, tail, isHorizontal) => {
    const nextHeadRow = head[0];
    const nextHeadCol = head[1] + 1;
    const headCell = grid[nextHeadRow][nextHeadCol];

    if (headCell !== 0) return null;
    if (isHorizontal) return [nextHeadRow, nextHeadCol];
    const nextTailRow = tail[0];
    const nextTailCol = tail[1] + 1;
    const tailCell = grid[nextTailRow][nextTailCol];

    return tailCell === 0 ? [nextHeadRow, nextHeadCol] : null;
  };

  const moveDown = (head, tail, isHorizontal) => {
    const nextHeadRow = head[0] + 1;
    const nextHeadCol = head[1];
    const headCell = grid[nextHeadRow]?.[nextHeadCol];

    if (headCell !== 0) return null;
    if (!isHorizontal) return [nextHeadRow, nextHeadCol];
    const nextTailRow = tail[0] + 1;
    const nextTailCol = tail[1];
    const tailCell = grid[nextTailRow]?.[nextTailCol];

    return tailCell === 0 ? [nextHeadRow, nextHeadCol] : null;
  };

  const moveRotate = (head, isHorizontal) => {
    let [nextHeadRow, nextHeadCol] = head;

    if (isHorizontal) {
      const throughCell = grid[nextHeadRow + 1]?.[nextHeadCol];

      if (throughCell !== 0) return null;
      nextHeadRow += 1;
      nextHeadCol -= 1;
    } else {
      const throughCell = grid[nextHeadRow][nextHeadCol + 1];

      if (throughCell !== 0) return null;
      nextHeadRow -= 1;
      nextHeadCol += 1;
    }
    const headCell = grid[nextHeadRow]?.[nextHeadCol];

    return headCell === 0 ? [nextHeadRow, nextHeadCol] : null;
  };

  const isCacheVisited = (head, isHorizontal) => {
    const key = `${isHorizontal},${head}`;

    if (visited.has(key)) return true;
    visited.add(key);
    return false;
  };

  while (queue.length) {
    const nextQueue = [];

    result += 1;

    for (const {
      isHorizontal,
      snake: [row, col],
    } of queue) {
      const head = [row, col];
      const tail = isHorizontal ? [row, col - 1] : [row - 1, col];
      const rightSnake = moveRight(head, tail, isHorizontal);
      const downSnake = moveDown(head, tail, isHorizontal);
      const rotateSnake = moveRotate(head, isHorizontal);

      if (rightSnake && !isCacheVisited(rightSnake, isHorizontal)) {
        if (isReach(rightSnake, isHorizontal)) return result;
        nextQueue.push({ isHorizontal, snake: rightSnake });
      }
      if (downSnake && !isCacheVisited(downSnake, isHorizontal)) {
        if (isReach(downSnake, isHorizontal)) return result;
        nextQueue.push({ isHorizontal, snake: downSnake });
      }
      if (rotateSnake && !isCacheVisited(rotateSnake, !isHorizontal)) {
        if (isReach(rotateSnake, !isHorizontal)) return result;
        nextQueue.push({ isHorizontal: !isHorizontal, snake: rotateSnake });
      }
    }
    queue = nextQueue;
  }
  return -1;
};
```
