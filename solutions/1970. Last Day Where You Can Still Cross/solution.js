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
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  let left = 1;
  let right = n - 1;
  let result = 0;

  const isPossibleToCross = day => {
    const graph = new Array(row).fill('').map(() => new Array(col).fill(0));

    for (let index = 0; index < day; index++) {
      const [r, c] = cells[index];

      graph[r - 1][c - 1] = 1;
    }

    const dfs = (r, c) => {
      if (r < 0 || c < 0 || r >= row || c >= col || graph[r][c]) return false;
      if (r === row - 1) return true;

      graph[r][c] = 1;

      for (const [moveRow, moveCol] of directions) {
        const nextRow = r + moveRow;
        const nextCol = c + moveCol;

        if (dfs(nextRow, nextCol)) return true;
      }

      return false;
    };

    for (let index = 0; index < col; index++) {
      if (dfs(0, index)) return true;
    }

    return false;
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (isPossibleToCross(mid)) {
      left = mid + 1;
      result = mid;
    } else {
      right = mid - 1;
    }
  }

  return result;
};
