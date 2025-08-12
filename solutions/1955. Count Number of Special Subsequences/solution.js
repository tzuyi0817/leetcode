/**
 * @param {number[]} nums
 * @return {number}
 */
const countSpecialSubsequences = function (nums) {
  const MODULO = 10 ** 9 + 7;
  const dp = [1, 0, 0, 0];

  for (const num of nums) {
    dp[num + 1] = (dp[num + 1] * 2 + dp[num]) % MODULO;
  }

  return dp[3];
};
