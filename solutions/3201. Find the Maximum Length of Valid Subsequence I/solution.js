/**
 * @param {number[]} nums
 * @return {number}
 */
const maximumLength = function (nums) {
  const dp = Array.from({ length: 2 }, () => new Array(2).fill(0));
  let result = 0;

  for (const num of nums) {
    const remainder = num % 2;

    dp[remainder][0] = dp[0][remainder] + 1;
    dp[remainder][1] = dp[1][remainder] + 1;
    result = Math.max(result, dp[remainder][0], dp[remainder][1]);
  }

  return result;
};
