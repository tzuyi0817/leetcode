/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
const kInversePairs = function (n, k) {
  const MODULO = 10 ** 9 + 7;
  let dp = Array(k + 1).fill(0);

  dp[0] = 1;

  for (let integer = 1; integer <= n; integer++) {
    const current = Array(k + 1).fill(0);

    current[0] = 1;

    for (let count = 1; count <= k; count++) {
      current[count] = (current[count - 1] + dp[count]) % MODULO;
      if (integer > count) continue;

      current[count] = (current[count] - dp[count - integer] + MODULO) % MODULO;
    }
    dp = current;
  }
  return dp[k];
};
