/**
 * @param {number} n
 * @param {number[][]} requirements
 * @return {number}
 */
const numberOfPermutations = function (n, requirements) {
  const MODULO = 10 ** 9 + 7;
  const endCounts = Array.from({ length: n + 1 }, () => -1);

  for (const [end, count] of requirements) {
    endCounts[end + 1] = count;
  }

  const maxCount = endCounts[n];
  const dp = Array.from({ length: n + 1 }, () => new Array(maxCount + 1).fill(0));

  dp[1][0] = 1;

  for (let len = 2; len <= n; len++) {
    for (let current = 0; current < len; current++) {
      for (let prev = 0; prev + current <= maxCount; prev++) {
        const inversions = current + prev;

        if (endCounts[len] !== -1 && inversions !== endCounts[len]) continue;

        dp[len][inversions] += dp[len - 1][prev];
        dp[len][inversions] %= MODULO;
      }
    }
  }

  return dp[n][maxCount];
};
