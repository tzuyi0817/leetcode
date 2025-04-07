/**
 * @param {number[]} nums
 * @return {boolean}
 */
const canPartition = function (nums) {
  const totalSum = nums.reduce((sum, num) => sum + num);

  if (totalSum % 2) return false;
  const subsetSum = totalSum / 2;
  const dp = Array.from({ length: subsetSum + 1 }, () => false);

  dp[0] = true;

  for (const num of nums) {
    for (let sum = subsetSum; sum >= num; sum--) {
      dp[sum] = dp[sum - num] || dp[sum];
    }
  }

  return dp[subsetSum];
};
