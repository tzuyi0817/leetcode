/**
 * @param {number[]} nums
 * @return {number}
 */
const reductionOperations = function (nums) {
  let level = 0;
  let result = 0;

  nums.sort((a, b) => a - b);

  for (let index = 1; index < nums.length; index++) {
    if (nums[index] !== nums[index - 1]) level += 1;

    result += level;
  }
  return result;
};
