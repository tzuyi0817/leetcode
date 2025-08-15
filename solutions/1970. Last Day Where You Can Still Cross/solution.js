/**
 * @param {number} row
 * @param {number} col
 * @param {number[][]} cells
 * @return {number}
 */
const latestDayToCross = function (row, col, cells) {
  const n = cells.length;
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let left = 0;
  let right = n - 1;
  let result = 0;

  const isCross = day => {
    const matrix = new Array(row).fill('').map(_ => new Array(col).fill(0));
    let queue = [];

    for (let index = 0; index < day; index++) {
      const [x, y] = cells[index];

      matrix[x - 1][y - 1] = 1;
    }

    for (let index = 0; index < col; index++) {
      if (matrix[0][index]) continue;

      matrix[0][index] = 1;
      queue.push({ row: 0, col: index });
    }

    while (queue.length) {
      const nextQueue = [];

      for (const land of queue) {
        for (const [moveRow, moveCol] of directions) {
          const nextRow = land.row + moveRow;
          const nextCol = land.col + moveCol;

          if (nextRow < 0 || nextRow >= row || nextCol < 0 || nextCol >= col) continue;
          if (matrix[nextRow][nextCol]) continue;
          if (nextRow === row - 1) return true;

          matrix[nextRow][nextCol] = 1;
          nextQueue.push({ row: nextRow, col: nextCol });
        }
      }

      queue = nextQueue;
    }

    return false;
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (isCross(mid)) {
      result = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
};
