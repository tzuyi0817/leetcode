/**
 * @param {number[]} nums
 * @return {number}
 */
const countPartitions = function (nums) {
  const n = nums.length;
  const sum = nums.reduce((result, num) => result + num);

  return sum % 2 ? 0 : n - 1;
};
