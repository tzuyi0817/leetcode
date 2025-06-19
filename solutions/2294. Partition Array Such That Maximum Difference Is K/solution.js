/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const partitionArray = function (nums, k) {
  const n = nums.length;

  nums.sort((a, b) => a - b);

  let currentMin = nums[0];
  let result = 1;

  for (let index = 1; index < n; index++) {
    const num = nums[index];

    if (num - currentMin > k) {
      result += 1;
      currentMin = num;
    }
  }

  return result;
};
