/**
 * @param {number[][]} grid
 * @return {number}
 */
const maxMoves = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  let dp = Array(m + 1).fill(0);

  for (let col = n - 2; col >= 0; col--) {
    const nextDp = Array(m + 1).fill(0);

    for (let row = 0; row < m; row++) {
      const value = grid[row][col];
      const upper = grid[row - 1]?.[col + 1];
      const middle = grid[row][col + 1];
      const lower = grid[row + 1]?.[col + 1];
      const index = row + 1;

      const upperStep = value < upper ? dp[index - 1] + 1 : 0;
      const middleStep = value < middle ? dp[index] + 1 : 0;
      const lowerStep = value < lower ? dp[index + 1] + 1 : 0;

      nextDp[index] = Math.max(upperStep, middleStep, lowerStep);
    }
    dp = nextDp;
  }
  return Math.max(...dp);
};
