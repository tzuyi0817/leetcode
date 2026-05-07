/**
 * @param {number[]} nums
 * @return {number[]}
 */
const maxValue = function (nums) {
  const n = nums.length;
  const prefixMax = Array.from({ length: n }, () => 0);
  const result = Array.from({ length: n }, () => -1);
  let suffixMin = Number.MAX_SAFE_INTEGER;

  prefixMax[0] = nums[0];

  for (let index = 1; index < n; index++) {
    prefixMax[index] = Math.max(nums[index], prefixMax[index - 1]);
  }

  for (let index = n - 1; index >= 0; index--) {
    const num = nums[index];

    if (prefixMax[index] > suffixMin) {
      result[index] = result[index + 1];
    } else {
      result[index] = prefixMax[index];
    }

    suffixMin = Math.min(num, suffixMin);
  }

  return result;
};
