/**
 * @param {number[]} nums
 * @param {number} minK
 * @param {number} maxK
 * @return {number}
 */
const countSubarrays = function (nums, minK, maxK) {
  const n = nums.length;
  let prevMinK = -1;
  let prevMaxK = -1;
  let left = -1;
  let result = 0;

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    if (num < minK || num > maxK) {
      left = index;
    }

    if (num === minK) {
      prevMinK = index;
    }

    if (num === maxK) {
      prevMaxK = index;
    }

    const count = Math.max(0, Math.min(prevMinK, prevMaxK) - left);

    result += count;
  }

  return result;
};
