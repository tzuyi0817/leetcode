/**
 * @param {number[]} nums
 * @return {number}
 */
const findMin = function (nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === nums[left] && nums[mid] === nums[right]) {
      left += 1;
      right -= 1;
      continue;
    }
    nums[mid] <= nums[right] ? (right = mid) : (left = mid + 1);
  }
  return nums[left];
};
