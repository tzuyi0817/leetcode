/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maximumLength = function (nums, k) {
  const dp = Array.from({ length: k }, () => new Array(k).fill(0));
  let result = 0;

  for (const num of nums) {
    const mod = num % k;

    for (let prev = 0; prev < k; prev++) {
      dp[mod][prev] = dp[prev][mod] + 1;
      result = Math.max(dp[mod][prev], result);
    }
  }

  return result;
};
