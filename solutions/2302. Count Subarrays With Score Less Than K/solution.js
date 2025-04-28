/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const countSubarrays = function (nums, k) {
  const n = nums.length;
  let left = 0;
  let sum = 0;
  let result = 0;

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    sum += num;

    while (sum * (index - left + 1) >= k) {
      sum -= nums[left];
      left += 1;
    }

    result += index - left + 1;
  }

  return result;
};
