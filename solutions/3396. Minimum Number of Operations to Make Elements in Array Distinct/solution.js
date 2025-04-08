/**
 * @param {number[]} nums
 * @return {number}
 */
const minimumOperations = function (nums) {
  const n = nums.length;
  const seen = new Set();

  for (let index = n - 1; index >= 0; index--) {
    const num = nums[index];

    if (seen.has(num)) {
      return Math.ceil((index + 1) / 3);
    }

    seen.add(num);
  }

  return 0;
};
