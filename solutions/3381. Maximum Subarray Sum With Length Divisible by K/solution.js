/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maxSubarraySum = function (nums, k) {
  const n = nums.length;
  const sums = Array.from({ length: k }, () => Number.MAX_SAFE_INTEGER);
  let prefixSum = 0;
  let result = Number.MIN_SAFE_INTEGER;

  sums[k - 1] = 0;

  for (let index = 0; index < n; index++) {
    prefixSum += nums[index];

    const pos = index % k;
    const sum = prefixSum - sums[pos];

    result = Math.max(sum, result);
    sums[pos] = Math.min(sums[pos], prefixSum);
  }

  return result;
};
