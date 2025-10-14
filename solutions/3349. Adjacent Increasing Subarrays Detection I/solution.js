/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
const hasIncreasingSubarrays = function (nums, k) {
  const n = nums.length;
  let increasing = 1;
  let prevIncreasing = 0;

  for (let index = 1; index < n; index++) {
    if (nums[index] > nums[index - 1]) {
      increasing += 1;
    } else {
      prevIncreasing = increasing;
      increasing = 1;
    }

    if (increasing >= k * 2 || Math.min(prevIncreasing, increasing) >= k) {
      return true;
    }
  }

  return false;
};
