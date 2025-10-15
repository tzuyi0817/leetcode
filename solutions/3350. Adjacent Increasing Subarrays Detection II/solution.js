/**
 * @param {number[]} nums
 * @return {number}
 */
const maxIncreasingSubarrays = function (nums) {
  const n = nums.length;
  let increasing = 1;
  let prevIncreasing = 0;
  let result = 1;

  for (let index = 1; index < n; index++) {
    if (nums[index] > nums[index - 1]) {
      increasing += 1;
    } else {
      prevIncreasing = increasing;
      increasing = 1;
    }

    const len1 = Math.floor(increasing / 2);
    const len2 = Math.min(prevIncreasing, increasing);

    result = Math.max(len1, len2, result);
  }

  return result;
};
