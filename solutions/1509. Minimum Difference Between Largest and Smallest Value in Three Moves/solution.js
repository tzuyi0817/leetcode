/**
 * @param {number[]} nums
 * @return {number}
 */
const minDifference = function (nums) {
  const n = nums.length;

  if (n <= 4) return 0;
  let result = Number.MAX_SAFE_INTEGER;

  nums.sort((a, b) => a - b);

  for (let index = 0; index < 4; index++) {
    const small = nums[index];
    const large = nums[n - 4 + index];

    result = Math.min(large - small, result);
  }
  return result;
};
