/**
 * @param {number[]} nums
 * @param {number[]} multipliers
 * @return {number}
 */
const maximumScore = function (nums, multipliers) {
  const n = nums.length;
  const m = multipliers.length;
  const dp = Array.from({ length: m }, () => {
    return new Array(m).fill(Number.MIN_SAFE_INTEGER);
  });

  const performOperation = (start, end, index) => {
    if (index >= m) return 0;
    if (dp[index][start] !== Number.MIN_SAFE_INTEGER) return dp[index][start];
    const multiplier = multipliers[index];
    const pickStart = nums[start] * multiplier + performOperation(start + 1, end, index + 1);
    const pickEnd = nums[end] * multiplier + performOperation(start, end - 1, index + 1);
    const result = Math.max(pickStart, pickEnd);

    dp[index][start] = result;

    return result;
  };

  return performOperation(0, n - 1, 0);
};
