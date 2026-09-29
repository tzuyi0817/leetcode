/**
 * @param {character[][]} grid
 * @return {boolean}
 */
const hasValidPath = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const dp = Array.from({ length: m * n }, () => new Array(m + n).fill(-1));

  const isValidPath = (row, col, diff) => {
    if (row >= m || col >= n) return false;

    const value = grid[row][col];
    const nextDiff = diff + (value === '(' ? 1 : -1);
    const remainCells = m - row + (n - col);

    if (nextDiff < 0 || nextDiff > remainCells) return false;

    const key = row * n + col;

    if (dp[key][diff] !== -1) return dp[key][diff];

    if (row === m - 1 && col === n - 1) return nextDiff === 0;

    const right = isValidPath(row + 1, col, nextDiff);
    const result = right || isValidPath(row, col + 1, nextDiff);

    dp[key][diff] = result;

    return result;
  };

  return isValidPath(0, 0, 0);
};
