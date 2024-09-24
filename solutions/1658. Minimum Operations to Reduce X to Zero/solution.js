/**
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
const minOperations = function (nums, x) {
  const sum = nums.reduce((result, num) => result + num);
  const size = nums.length;

  if (sum === x) return size;
  const prefixSumMap = new Map([[0, -1]]);
  const target = sum - x;
  let currentSum = 0;
  let result = -1;

  for (let index = 0; index < size; index++) {
    currentSum += nums[index];
    prefixSumMap.set(currentSum, index);

    if (prefixSumMap.has(currentSum - target)) {
      const position = prefixSumMap.get(currentSum - target);

      result = Math.max(result, index - position);
    }
  }
  return result > -1 ? size - result : -1;
};
