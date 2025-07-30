/**
 * @param {number[]} nums
 * @return {number}
 */
const longestSubarray = function (nums) {
  const n = nums.length;
  const maxNum = Math.max(...nums);
  let length = 0;
  let result = 0;

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    if (num === maxNum) {
      length += 1;
    } else {
      length = 0;
    }

    result = Math.max(length, result);
  }

  return result;
};
