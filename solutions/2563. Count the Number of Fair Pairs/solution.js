/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
const countFairPairs = function (nums, lower, upper) {
  const n = nums.length;

  nums.sort((a, b) => a - b);

  const getPairCount = target => {
    let left = 0;
    let right = n - 1;
    let result = 0;

    while (left < right) {
      const sum = nums[left] + nums[right];

      if (sum <= target) {
        result += right - left;
        left += 1;
      } else {
        right -= 1;
      }
    }
    return result;
  };

  return getPairCount(upper) - getPairCount(lower - 1);
};
