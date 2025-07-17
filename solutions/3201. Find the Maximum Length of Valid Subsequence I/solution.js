/**
 * @param {number[]} nums
 * @return {number}
 */
const maximumLength = function (nums) {
  const dp = Array.from({ length: 2 }, () => new Array(2).fill(0));
  let result = 0;

  for (const num of nums) {
    const mod = num % 2;

    dp[mod][0] = dp[0][mod] + 1;
    dp[mod][1] = dp[1][mod] + 1;
    result = Math.max(result, dp[mod][0], dp[mod][1]);
  }

  return result;
};
