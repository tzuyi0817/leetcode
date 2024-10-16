/**
 * @param {number[]} stones
 * @param {number} k
 * @return {number}
 */
const mergeStones = function (stones, k) {
  const n = stones.length;

  if ((n - 1) % (k - 1)) return -1;

  const prefixSum = Array(n + 1).fill(0);

  for (let index = 0; index < n; index++) {
    prefixSum[index + 1] = prefixSum[index] + stones[index];
  }

  const dp = Array(n)
    .fill('')
    .map(_ => Array(n).fill(Number.MAX_SAFE_INTEGER));

  for (let index = 0; index < n; index++) {
    dp[index][index] = 0;
  }

  for (let length = 2; length <= n; length++) {
    for (let left = 0; left + length <= n; left++) {
      const right = left + length - 1;

      for (let index = left; index < right; index += k - 1) {
        dp[left][right] = Math.min(dp[left][index] + dp[index + 1][right], dp[left][right]);
      }

      if ((length - 1) % (k - 1) === 0) {
        dp[left][right] += prefixSum[right + 1] - prefixSum[left];
      }
    }
  }
  return dp[0][n - 1];
};
