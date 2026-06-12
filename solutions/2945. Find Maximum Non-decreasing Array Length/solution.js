/**
 * @param {number[]} nums
 * @return {number}
 */
const findMaximumLength = function (nums) {
  const n = nums.length;
  const prefixSum = Array.from({ length: n + 1 }, () => 0);
  const dp = Array.from({ length: n + 1 }, () => 0);
  const bestLeft = Array.from({ length: n + 2 }, () => 0);

  for (let index = 1; index <= n; index++) {
    prefixSum[index] = prefixSum[index - 1] + nums[index - 1];
  }

  const findFirstGreaterEqual = target => {
    let left = 0;
    let right = n;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      prefixSum[mid] >= target ? (right = mid - 1) : (left = mid + 1);
    }

    return left;
  };

  for (let index = 1; index <= n; index++) {
    bestLeft[index] = Math.max(bestLeft[index], bestLeft[index - 1]);

    const l = bestLeft[index];
    const target = prefixSum[index] * 2 - prefixSum[l];
    const r = findFirstGreaterEqual(target);

    dp[index] = dp[l] + 1;

    if (r < bestLeft.length) {
      bestLeft[r] = index;
    }
  }

  return dp[n];
};
