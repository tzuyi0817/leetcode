/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const sortColors = function (nums) {
  const n = nums.length;
  let left = 0;
  let right = n - 1;

  while (nums[left] === 0) left += 1;
  while (nums[right] === 2) right -= 1;

  if (left >= right) return;
  let index = left;

  while (index <= right) {
    const num = nums[index];

    if (num === 0) {
      [nums[left], nums[index]] = [nums[index], nums[left]];
      left += 1;
      index += 1;
    } else if (num === 2) {
      [nums[index], nums[right]] = [nums[right], nums[index]];
      right -= 1;
    } else {
      index += 1;
    }
  }
};
