/**
 * @param {number[][]} dungeon
 * @return {number}
 */
const calculateMinimumHP = function (dungeon) {
  const m = dungeon.length;
  const n = dungeon[0].length;
  const dp = new Array(n + 1).fill(Number.MAX_SAFE_INTEGER);

  dp[n - 1] = 1;

  for (let row = m - 1; row >= 0; row--) {
    for (let col = n - 1; col >= 0; col--) {
      const value = dungeon[row][col];
      const minHealth = Math.min(dp[col], dp[col + 1]) - value;

      dp[col] = Math.max(1, minHealth);
    }
  }
  return dp[0];
};
