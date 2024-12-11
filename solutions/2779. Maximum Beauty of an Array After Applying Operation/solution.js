/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maximumBeauty = function (nums, k) {
  const n = nums.length;
  let left = 0;
  let result = 1;

  nums.sort((a, b) => a - b);

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    while (left < index && num - nums[left] > 2 * k) {
      left += 1;
    }
    result = Math.max(index - left + 1, result);
  }
  return result;
};
