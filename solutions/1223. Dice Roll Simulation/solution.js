/**
 * @param {number} n
 * @param {number[]} rollMax
 * @return {number}
 */
const dieSimulator = function (n, rollMax) {
  const MODULO = 10 ** 9 + 7;
  const dp = Array.from({ length: n + 1 }, () => Array.from({ length: 6 }, () => 0));
  const sum = Array.from({ length: n + 1 }, () => 0);

  sum[0] = 1;

  for (let roll = 1; roll <= n; roll++) {
    for (let die = 0; die < 6; die++) {
      for (let continuous = 1; continuous <= rollMax[die]; continuous++) {
        if (continuous > roll) continue;
        const times = (sum[roll - continuous] - dp[roll - continuous][die] + MODULO) % MODULO;

        dp[roll][die] = (dp[roll][die] + times) % MODULO;
      }
      sum[roll] = (sum[roll] + dp[roll][die]) % MODULO;
    }
  }

  return sum[n];
};
