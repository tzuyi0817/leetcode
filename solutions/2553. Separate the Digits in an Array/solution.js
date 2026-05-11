/**
 * @param {number[]} nums
 * @return {number[]}
 */
const separateDigits = function (nums) {
  return nums.join('').split('').map(Number);
};
