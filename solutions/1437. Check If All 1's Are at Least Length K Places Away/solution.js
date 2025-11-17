/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
const kLengthApart = function (nums, k) {
  const n = nums.length;
  let prevOne = -1;

  for (let index = 0; index < n; index++) {
    if (!nums[index]) continue;

    if (prevOne !== -1 && index - prevOne - 1 < k) {
      return false;
    }

    prevOne = index;
  }

  return true;
};
