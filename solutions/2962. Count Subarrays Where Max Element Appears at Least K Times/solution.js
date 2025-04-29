/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const countSubarrays = function (nums, k) {
  const n = nums.length;
  const maxNum = Math.max(...nums);
  let left = 0;
  let count = 0;
  let result = 0;

  for (let index = 0; index < n; index++) {
    if (nums[index] === maxNum) {
      count += 1;
    }

    while (count >= k) {
      if (nums[left] === maxNum) {
        count -= 1;
      }

      result += n - index;
      left += 1;
    }
  }

  return result;
};
