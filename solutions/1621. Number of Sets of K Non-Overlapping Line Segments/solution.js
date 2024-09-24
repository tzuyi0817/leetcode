/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
const numberOfSets = function (n, k) {
  const MODULO = 10 ** 9 + 7;
  const combinatorics = (n, k) => {
    const dp = Array(n + 1)
      .fill('')
      .map(_ => Array(k + 1).fill(1));

    for (let index = 1; index <= n; index++) {
      for (let point = 1; point < index && point <= k; point++) {
        dp[index][point] = (dp[index - 1][point - 1] + dp[index - 1][point]) % MODULO;
      }
    }
    return dp[n][k];
  };

  return combinatorics(n + k - 1, k * 2);
};
