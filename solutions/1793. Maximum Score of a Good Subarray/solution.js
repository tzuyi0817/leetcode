/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maximumScore = function (nums, k) {
  const n = nums.length;
  let left = k;
  let right = k;
  let minNum = nums[k];
  let result = nums[k];

  while (left > 0 || right < n - 1) {
    left === 0 || nums[right + 1] > nums[left - 1] ? (right += 1) : (left -= 1);
    minNum = Math.min(nums[left], nums[right], minNum);

    const score = (right - left + 1) * minNum;

    result = Math.max(score, result);
  }

  return result;
};
