/**
 * @param {number[]} nums
 * @return {number}
 */
const smallestEqual = function (nums) {
  return nums.findIndex((num, index) => index % 10 === num);
};
