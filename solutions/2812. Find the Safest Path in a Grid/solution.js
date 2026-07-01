/**
 * @param {number[][]} grid
 * @return {number}
 */
const maximumSafenessFactor = function (grid) {
  const n = grid.length;

  if (grid[0][0] || grid[n - 1][n - 1]) return 0;

  const safeness = Array.from({ length: n }, () => new Array(n).fill(-1));
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  let queue = [];

  const isOutOfBounds = (row, col) => row < 0 || col < 0 || row >= n || col >= n;

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (grid[row][col]) {
        safeness[row][col] = 0;
        queue.push({ row, col });
      }
    }
  }

  while (queue.length) {
    const nextQueue = [];

    for (const { row, col } of queue) {
      const factor = safeness[row][col];

      for (const [moveRow, moveCol] of directions) {
        const nextRow = row + moveRow;
        const nextCol = col + moveCol;

        if (isOutOfBounds(nextRow, nextCol)) continue;

        if (safeness[nextRow][nextCol] !== -1) continue;

        safeness[nextRow][nextCol] = factor + 1;
        nextQueue.push({ row: nextRow, col: nextCol });
      }
    }

    queue = nextQueue;
  }

  const maxHeap = new MaxHeap(({ safeness }) => safeness);
  const visited = Array.from({ length: n }, () => new Array(n).fill(false));

  maxHeap.push({ row: 0, col: 0, safeness: safeness[0][0] });

  while (maxHeap.size()) {
    const { row, col, safeness: currentSafeness } = maxHeap.pop();

    if (visited[row][col]) continue;

    visited[row][col] = true;

    if (row === n - 1 && col === n - 1) {
      return currentSafeness;
    }

    for (const [moveRow, moveCol] of directions) {
      const nextRow = row + moveRow;
      const nextCol = col + moveCol;

      if (isOutOfBounds(nextRow, nextCol)) continue;

      const nextSafeness = Math.min(currentSafeness, safeness[nextRow][nextCol]);

      maxHeap.push({ row: nextRow, col: nextCol, safeness: nextSafeness });
    }
  }

  return 0;
};
