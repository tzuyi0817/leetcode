/**
 * @param {number[]} nums
 * @return {number}
 */
const countMaxOrSubsets = function (nums) {
  const n = nums.length;
  const target = nums.reduce((result, num) => result | num);
  let result = 0;

  const findTargetSubset = (index, xor) => {
    if (index >= n) {
      result += xor === target ? 1 : 0;
      return;
    }

    findTargetSubset(index + 1, xor);
    findTargetSubset(index + 1, xor | nums[index]);
  };

  findTargetSubset(0, 0);

  return result;
};
