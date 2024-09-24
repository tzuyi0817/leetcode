/**
 * @param {number[]} nums
 * @return {number}
 */
const maxAbsoluteSum = function (nums) {
  let sum = (max = min = 0);

  for (const num of nums) {
    sum += num;
    max = Math.max(sum, max);
    min = Math.min(sum, min);
  }
  return max - min;
};
