/**
 * @param {number[][]} grid
 * @return {number}
 */
const minCost = function (grid) {
  const RIGHT = 1;
  const LEFT = 2;
  const LOWER = 3;
  const UPPER = 4;

  const m = grid.length;
  const n = grid[0].length;
  const directions = [
    [0, 1, LOWER],
    [1, 0, RIGHT],
    [0, -1, UPPER],
    [-1, 0, LEFT],
  ];
  const queue = new MinPriorityQueue({ priority: ({ cost }) => cost });
  const costs = Array.from({ length: m }, () => new Array(n).fill(Number.MAX_SAFE_INTEGER));

  queue.enqueue({ row: 0, col: 0, cost: 0 });
  costs[0][0] = 0;

  while (queue.size()) {
    const { row, col, cost } = queue.dequeue().element;
    const cell = grid[row][col];

    if (row === m - 1 && col === n - 1) return cost;

    for (const [moveCol, moveRow, sign] of directions) {
      const nextCol = col + moveCol;
      const nextRow = row + moveRow;

      if (nextCol >= n || nextRow >= m || nextCol < 0 || nextRow < 0) continue;
      const isChangeSign = cell !== sign;
      const nextCost = isChangeSign ? cost + 1 : cost;

      if (costs[nextRow][nextCol] <= nextCost) continue;

      queue.enqueue({ row: nextRow, col: nextCol, cost: nextCost });
      costs[nextRow][nextCol] = nextCost;
    }
  }
  return -1;
};
