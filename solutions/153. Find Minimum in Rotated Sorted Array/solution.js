/**
 * @param {number[]} nums
 * @return {number}
 */
const findMin = function (nums) {
  const n = nums.length;
  let left = 0;
  let right = n - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const prevNum = nums[mid - 1] ?? Number.MAX_SAFE_INTEGER;
    const nextNum = nums[mid + 1] ?? Number.MAX_SAFE_INTEGER;
    const num = nums[mid];

    if (num < prevNum && num < nextNum) {
      return nums[mid];
    }

    if (num > nums[right]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return nums[left];
};
