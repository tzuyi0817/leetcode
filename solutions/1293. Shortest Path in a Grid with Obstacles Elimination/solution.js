/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
const shortestPath = function (grid, k) {
  const OBSTACLE = 1;
  const m = grid.length;
  const n = grid[0].length;

  if (m * n === 1) return 0;
  const visited = Array.from({ length: m }, () => new Array(n).fill(-1));
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  let queue = [{ row: 0, col: 0, elimination: k }];
  let result = 0;

  while (queue.length) {
    const nextQueue = [];

    result += 1;

    for (const { row, col, elimination } of queue) {
      for (const [moveRow, moveCol] of directions) {
        const nextRow = row + moveRow;
        const nextCol = col + moveCol;

        if (nextRow < 0 || nextCol < 0 || nextRow >= m || nextCol >= n) continue;
        const cell = grid[row][col];

        if (cell === OBSTACLE && !elimination) continue;
        if (nextRow === m - 1 && nextCol === n - 1) return result;
        const nextElimination = cell === OBSTACLE ? elimination - 1 : elimination;

        if (nextElimination <= visited[nextRow][nextCol]) continue;
        nextQueue.push({ row: nextRow, col: nextCol, elimination: nextElimination });
        visited[nextRow][nextCol] = nextElimination;
      }
    }
    queue = nextQueue;
  }
  return -1;
};
