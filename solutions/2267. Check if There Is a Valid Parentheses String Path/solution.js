/**
 * @param {character[][]} grid
 * @return {boolean}
 */
const hasValidPath = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const dp = Array.from({ length: m }, () => {
    return new Array(n).fill('').map(() => new Array(m + n).fill(-1));
  });

  const findValidPath = (row, col, parentheses) => {
    if (row >= m || col >= n) return false;
    if (dp[row][col][parentheses] !== -1) return dp[row][col][parentheses];

    const value = grid[row][col];
    const diff = value === '(' ? 1 : -1;
    const nextParentheses = parentheses + diff;

    if (nextParentheses < 0) return false;
    if (nextParentheses > m + n - row - col) return false;
    if (row === m - 1 && col === n - 1) {
      return nextParentheses === 0;
    }

    const down = findValidPath(row + 1, col, nextParentheses);
    const right = findValidPath(row, col + 1, nextParentheses);
    const result = down || right;

    dp[row][col][parentheses] = result;

    return result;
  };

  return findValidPath(0, 0, 0);
};
