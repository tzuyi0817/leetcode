/**
 * @param {number[][]} grid
 * @return {number}
 */
const minimumObstacles = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const queue = new MinPriorityQueue({ priority: ({ obstacles }) => obstacles });
  const memo = Array.from({ length: m }, () => {
    return Array.from({ length: n }, () => Number.MAX_SAFE_INTEGER);
  });

  queue.enqueue({ obstacles: grid[0][0], row: 0, col: 0 });

  while (queue.size()) {
    const { obstacles, row, col } = queue.dequeue().element;

    if (row === m - 1 && col === n - 1) return obstacles;

    for (const [moveRow, moveCol] of directions) {
      const nextRow = row + moveRow;
      const nextCol = col + moveCol;

      if (nextRow < 0 || nextCol < 0 || nextRow >= m || nextCol >= n) continue;
      const nextObstacles = obstacles + grid[nextRow][nextCol];

      if (nextObstacles >= memo[nextRow][nextCol]) continue;

      memo[nextRow][nextCol] = nextObstacles;
      queue.enqueue({ obstacles: nextObstacles, row: nextRow, col: nextCol });
    }
  }
  return -1;
};
