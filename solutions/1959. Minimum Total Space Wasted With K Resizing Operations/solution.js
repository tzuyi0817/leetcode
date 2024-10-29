/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minSpaceWastedKResizing = function (nums, k) {
  const size = nums.length;
  const dp = new Array(size).fill('').map(_ => new Array(k + 1).fill(Number.MAX_SAFE_INTEGER));
  let sum = 0;
  let max = 0;

  for (let index = 0; index < size; index++) {
    const num = nums[index];

    sum += num;
    max = Math.max(num, max);
    dp[index][0] = (index + 1) * max - sum;
  }
  for (let a = 1; a < size; a++) {
    sum = max = 0;
    for (let b = a; b >= 0; b--) {
      sum += nums[b];
      max = Math.max(nums[b], max);
      const wasted = max * (a - b + 1) - sum;

      for (let times = 1; times <= k; times++) {
        const previousWasted = dp[b - 1]?.[times - 1] ?? Number.MAX_SAFE_INTEGER;

        dp[a][times] = Math.min(previousWasted + wasted, dp[a][times]);
      }
    }
  }
  return dp[size - 1][k];
};
