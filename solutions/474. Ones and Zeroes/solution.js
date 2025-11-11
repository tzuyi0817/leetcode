/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
const findMaxForm = function (strs, m, n) {
  const len = strs.length;
  const strOnesAndZeros = Array.from({ length: len }, () => [0, 0]);
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let index = 0; index < len; index++) {
    for (const char of strs[index]) {
      strOnesAndZeros[index][char] += 1;
    }
  }

  for (let index = 0; index < len; index++) {
    const [zeros, ones] = strOnesAndZeros[index];

    for (let a = m; a >= zeros; a--) {
      for (let b = n; b >= ones; b--) {
        const size = 1 + dp[a - zeros][b - ones];

        dp[a][b] = Math.max(size, dp[a][b]);
      }
    }
  }

  return dp[m][n];
};
