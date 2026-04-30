/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
const maxPathScore = function (grid, k) {
  const m = grid.length;
  const n = grid[0].length;
  const dp = Array.from({ length: m }, () => {
    return new Array(n).fill('').map(() => new Array(k + 1).fill(null));
  });

  const getMaxScore = (row, col, cost) => {
    if (row >= m || col >= n) return -1;

    if (dp[row][col][cost] !== null) return dp[row][col][cost];

    const score = grid[row][col];
    const nextCost = cost + (score ? 1 : 0);
    let result = -1;

    if (row === m - 1 && col === n - 1) {
      return nextCost > k ? -1 : score;
    }

    if (nextCost <= k) {
      const moveRightScore = getMaxScore(row, col + 1, nextCost);
      const moveDownScore = getMaxScore(row + 1, col, nextCost);

      if (moveRightScore > -1) {
        result = Math.max(score + moveRightScore, result);
      }

      if (moveDownScore > -1) {
        result = Math.max(score + moveDownScore, result);
      }
    }

    dp[row][col][cost] = result;

    return result;
  };

  return getMaxScore(0, 0, 0);
};
