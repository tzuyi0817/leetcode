/**
 * @param {number[]} nums
 * @return {number}
 */
const maximumUniqueSubarray = function (nums) {
  const score = new Set();
  const size = nums.length;
  let start = 0;
  let end = 0;
  let result = 0;
  let sum = 0;

  while (end < size) {
    if (score.has(nums[end])) {
      score.delete(nums[start]);
      sum -= nums[start];
      start += 1;
    } else {
      score.add(nums[end]);
      sum += nums[end];
      end += 1;
      result = Math.max(sum, result);
    }
  }
  return result;
};
