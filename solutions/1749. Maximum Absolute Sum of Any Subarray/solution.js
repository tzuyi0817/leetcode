/**
 * @param {number[]} nums
 * @return {number}
 */
const maxAbsoluteSum = function (nums) {
  let maxSum = Number.MIN_SAFE_INTEGER;
  let minSum = Number.MAX_SAFE_INTEGER;
  let result = 0;

  for (const num of nums) {
    maxSum = Math.max(maxSum + num, num);
    minSum = Math.min(minSum + num, num);
    result = Math.max(result, maxSum, Math.abs(minSum));
  }

  return result;
};
