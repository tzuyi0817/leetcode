/**
 * @param {number[][]} grid
 * @param {number} health
 * @return {boolean}
 */
const findSafeWalk = function (grid, health) {
  const m = grid.length;
  const n = grid[0].length;
  const directions = [
    [0, -1],
    [0, 1],
    [1, 0],
    [-1, 0],
  ];
  const lifes = Array.from({ length: m }, () => new Array(n).fill(0));
  let queue = [{ row: 0, col: 0, life: health - grid[0][0] }];

  while (queue.length) {
    const nextQueue = [];

    for (const { row, col, life } of queue) {
      if (row === m - 1 && col === n - 1) return true;

      for (const [moveRow, moveCol] of directions) {
        const nextRow = row + moveRow;
        const nextCol = col + moveCol;

        if (nextRow < 0 || nextCol < 0 || nextRow >= m || nextCol >= n) continue;

        const value = grid[nextRow][nextCol];
        const nextLife = life - value;

        if (nextLife < 1 || nextLife <= lifes[nextRow][nextCol]) continue;

        lifes[nextRow][nextCol] = nextLife;
        nextQueue.push({ row: nextRow, col: nextCol, life: nextLife });
      }
    }

    queue = nextQueue;
  }

  return false;
};
