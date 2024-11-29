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
