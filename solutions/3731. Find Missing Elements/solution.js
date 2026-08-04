/**
 * @param {number[]} nums
 * @return {number[]}
 */
const findMissingElements = function (nums) {
  const minNum = Math.min(...nums);
  const maxNum = Math.max(...nums);
  const numSet = new Set(nums);
  const result = [];

  for (let num = minNum + 1; num < maxNum; num++) {
    if (!numSet.has(num)) {
      result.push(num);
    }
  }

  return result;
};
