/**
 * @param {number[]} nums
 * @return {boolean}
 */
const isArraySpecial = function (nums) {
  const n = nums.length;

  for (let index = 1; index < n; index++) {
    if (nums[index] % 2 === nums[index - 1] % 2) return false;
  }
  return true;
};
