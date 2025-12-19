/**
 * @param {number[][]} grid
 * @return {number}
 */
const countPaths = function (grid) {
  const MODULO = 10 ** 9 + 7;
  const m = grid.length;
  const n = grid[0].length;
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const dp = Array.from({ length: m }, () => new Array(n).fill(0));
  let result = 0;

  const increasingPaths = (row, col) => {
    if (dp[row][col]) return dp[row][col];

    const current = grid[row][col];
    let paths = 1;

    for (const [moveRow, moveCol] of directions) {
      const nextRow = row + moveRow;
      const nextCol = col + moveCol;

      if (nextRow < 0 || nextCol < 0 || nextRow >= m || nextCol >= n) continue;
      if (current >= grid[nextRow][nextCol]) continue;

      paths = (paths + increasingPaths(nextRow, nextCol)) % MODULO;
    }

    dp[row][col] = paths;

    return paths;
  };

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      result = (result + increasingPaths(row, col)) % MODULO;
    }
  }

  return result;
};
