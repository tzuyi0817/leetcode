# [3341. Find Minimum Time to Reach Last Room I](https://leetcode.com/problems/find-minimum-time-to-reach-last-room-i)

## Description

<div class="elfjS" data-track-load="description_content"><p>There is a dungeon with <code>n x m</code> rooms arranged as a grid.</p>

<p>You are given a 2D array <code>moveTime</code> of size <code>n x m</code>, where <code>moveTime[i][j]</code> represents the <strong>minimum</strong> time in seconds when you can <strong>start moving</strong> to that room. You start from the room <code>(0, 0)</code> at time <code>t = 0</code> and can move to an <strong>adjacent</strong> room. Moving between adjacent rooms takes <em>exactly</em> one second.</p>

<p>Return the <strong>minimum</strong> time to reach the room <code>(n - 1, m - 1)</code>.</p>

<p>Two rooms are <strong>adjacent</strong> if they share a common wall, either <em>horizontally</em> or <em>vertically</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">moveTime = [[0,4],[4,4]]</span></p>

<p><strong>Output:</strong> <span class="example-io">6</span></p>

<p><strong>Explanation:</strong></p>

<p>The minimum time required is 6 seconds.</p>

<ul>
	<li>At time <code>t == 4</code>, move from room <code>(0, 0)</code> to room <code>(1, 0)</code> in one second.</li>
	<li>At time <code>t == 5</code>, move from room <code>(1, 0)</code> to room <code>(1, 1)</code> in one second.</li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">moveTime = [[0,0,0],[0,0,0]]</span></p>

<p><strong>Output:</strong> <span class="example-io">3</span></p>

<p><strong>Explanation:</strong></p>

<p>The minimum time required is 3 seconds.</p>

<ul>
	<li>At time <code>t == 0</code>, move from room <code>(0, 0)</code> to room <code>(1, 0)</code> in one second.</li>
	<li>At time <code>t == 1</code>, move from room <code>(1, 0)</code> to room <code>(1, 1)</code> in one second.</li>
	<li>At time <code>t == 2</code>, move from room <code>(1, 1)</code> to room <code>(1, 2)</code> in one second.</li>
</ul>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">moveTime = [[0,1],[1,2]]</span></p>

<p><strong>Output:</strong> <span class="example-io">3</span></p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= n == moveTime.length &lt;= 50</code></li>
	<li><code>2 &lt;= m == moveTime[i].length &lt;= 50</code></li>
	<li><code>0 &lt;= moveTime[i][j] &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dijkstra's Algorithm`**

- Time complexity: <em>O(mnlogmn)</em>
- Space complexity: <em>O(mn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} moveTime
 * @return {number}
 */
const minTimeToReach = function (moveTime) {
  const m = moveTime.length;
  const n = moveTime[0].length;
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const visited = Array.from({ length: m }, () => new Array(n).fill(false));
  const minHeap = new MinPriorityQueue(({ time }) => time);

  minHeap.enqueue({ row: 0, col: 0, time: 0 });
  visited[0][0] = true;

  while (minHeap.size()) {
    const { row, col, time } = minHeap.dequeue();

    if (row === m - 1 && col === n - 1) return time;

    for (const [moveRow, moveCol] of directions) {
      const nextRow = row + moveRow;
      const nextCol = col + moveCol;

      if (nextRow < 0 || nextCol < 0 || nextRow >= m || nextCol >= n || visited[nextRow][nextCol]) continue;
      const nextTime = 1 + Math.max(time, moveTime[nextRow][nextCol]);

      minHeap.enqueue({ row: nextRow, col: nextCol, time: nextTime });
      visited[nextRow][nextCol] = true;
    }
  }

  return -1;
};
```
