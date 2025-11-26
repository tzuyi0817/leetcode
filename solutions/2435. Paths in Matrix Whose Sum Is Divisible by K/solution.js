/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
const numberOfPaths = function (grid, k) {
  const MODULO = 10 ** 9 + 7;
  const m = grid.length;
  const n = grid[0].length;
  const dp = Array.from({ length: m }, () => {
    return new Array(n).fill('').map(() => new Array(k + 1).fill(-1));
  });

  const divisiblePaths = (row, col, current) => {
    if (row >= m || col >= n) return 0;
    if (dp[row][col][current] !== -1) return dp[row][col][current];

    const value = grid[row][col];
    const nextCurrent = (current + value) % k;

    if (row === m - 1 && col === n - 1) return nextCurrent ? 0 : 1;

    const downPaths = divisiblePaths(row + 1, col, nextCurrent);
    const rightPaths = divisiblePaths(row, col + 1, nextCurrent);
    const paths = (downPaths + rightPaths) % MODULO;

    dp[row][col][current] = paths;

    return paths;
  };

  return divisiblePaths(0, 0, 0);
};
