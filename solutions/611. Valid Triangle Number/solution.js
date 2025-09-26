/**
 * @param {number[]} nums
 * @return {number}
 */
const triangleNumber = function (nums) {
  const n = nums.length;
  let result = 0;

  nums.sort((a, b) => a - b);

  for (let index = n - 1; index > 1; index--) {
    const num = nums[index];
    let left = 0;
    let right = index - 1;

    while (left < right) {
      if (nums[left] + nums[right] > num) {
        result += right - left;
        right -= 1;
      } else {
        left += 1;
      }
    }
  }

  return result;
};
