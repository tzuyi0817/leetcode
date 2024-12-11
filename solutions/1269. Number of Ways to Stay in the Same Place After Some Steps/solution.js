/**
 * @param {number} steps
 * @param {number} arrLen
 * @return {number}
 */
const numWays = function (steps, arrLen) {
  const MODULO = 10 ** 9 + 7;
  const n = Math.min(Math.floor(steps / 2) + 1, arrLen);
  let dp = Array.from({ length: n }, () => 0);

  dp[0] = 1;

  for (let step = 1; step <= steps; step++) {
    const nextDp = [...dp];

    for (let index = 0; index < n; index++) {
      if (index > 0) {
        nextDp[index] += dp[index - 1];
      }
      if (index < n - 1) {
        nextDp[index] += dp[index + 1];
      }
      nextDp[index] %= MODULO;
    }
    dp = nextDp;
  }
  return dp[0];
};
