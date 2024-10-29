/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const getAverages = function (nums, k) {
  const size = nums.length;
  const count = k * 2 + 1;
  const result = new Array(size).fill(-1);
  let currentSum = (left = 0);

  for (let index = 0; index < nums.length; index++) {
    currentSum += nums[index];

    if (index < count - 1) continue;
    result[index - k] = Math.floor(currentSum / count);
    currentSum -= nums[left];
    left += 1;
  }
  return result;
};
