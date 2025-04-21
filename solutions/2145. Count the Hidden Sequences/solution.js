/**
 * @param {number[]} differences
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
const numberOfArrays = function (differences, lower, upper) {
  let maxSum = 0;
  let minSum = 0;
  let sum = 0;

  for (const difference of differences) {
    sum += difference;
    maxSum = Math.max(sum, maxSum);
    minSum = Math.min(sum, minSum);
  }

  return Math.max(0, upper - maxSum - (lower - minSum) + 1);
};
