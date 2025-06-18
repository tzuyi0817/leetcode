/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[][]}
 */
const divideArray = function (nums, k) {
  const n = nums.length;
  const result = [];

  nums.sort((a, b) => a - b);

  for (let index = 2; index < n; index += 3) {
    if (nums[index] - nums[index - 2] > k) return [];

    result.push([nums[index - 2], nums[index - 1], nums[index]]);
  }

  return result;
};
