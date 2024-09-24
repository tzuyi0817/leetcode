/**
 * @param {number[]} nums
 * @return {number}
 */
const maxCoins = function (nums) {
  const n = nums.length;
  const coins = [1, ...nums, 1];
  const dp = Array(n + 2)
    .fill('')
    .map(_ => Array(n + 2).fill(0));

  for (let left = n; left >= 1; left--) {
    for (let right = left; right <= n; right++) {
      let max = 0;

      for (let index = left; index <= right; index++) {
        const current = coins[left - 1] * coins[index] * coins[right + 1];

        max = Math.max(max, current + dp[left][index - 1] + dp[index + 1][right]);
      }
      dp[left][right] = max;
    }
  }
  return dp[1][n];
};
