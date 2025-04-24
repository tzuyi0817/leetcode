/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number}
 */
const minPatches = function (nums, n) {
  let result = 0;
  let index = 0;
  let currentRange = 0;

  while (currentRange < n) {
    if (index < nums.length && currentRange + 1 >= nums[index]) {
      currentRange += nums[index];
      index += 1;
      continue;
    }
    currentRange += currentRange + 1;
    result += 1;
  }
  return result;
};
