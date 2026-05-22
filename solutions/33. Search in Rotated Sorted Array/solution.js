/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = function (nums, target) {
  const n = nums.length;
  let left = 0;
  let right = n - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const num = nums[mid];

    if (num === target) return mid;

    if (nums[left] <= num) {
      if (num > target && nums[left] <= target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (num < target && nums[right] >= target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
};
