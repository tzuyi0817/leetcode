/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const targetIndices = function (nums, target) {
  const result = [];
  let count = 0;
  let smallerCount = 0;

  for (const num of nums) {
    if (num < target) {
      smallerCount += 1;
    } else if (num === target) {
      count += 1;
    }
  }

  for (let index = 0; index < count; index++) {
    result.push(smallerCount + index);
  }

  return result;
};
