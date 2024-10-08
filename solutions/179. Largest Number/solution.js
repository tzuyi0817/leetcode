/**
 * @param {number[]} nums
 * @return {string}
 */
const largestNumber = function (nums) {
  nums.sort((a, b) => `${b}${a}` - `${a}${b}`);

  return nums[0] ? nums.join('') : '0';
};
