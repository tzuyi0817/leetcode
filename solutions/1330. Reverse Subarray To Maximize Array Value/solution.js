/**
 * @param {number[]} nums
 * @return {number}
 */
const maxValueAfterReverse = function (nums) {
  const n = nums.length;
  let minMax = Number.MAX_SAFE_INTEGER;
  let maxMin = Number.MIN_SAFE_INTEGER;
  let total = 0;

  for (let index = 1; index < n; index++) {
    const a = nums[index - 1];
    const b = nums[index];

    total += Math.abs(a - b);
    minMax = Math.min(minMax, Math.max(a, b));
    maxMin = Math.max(maxMin, Math.min(a, b));
  }
  let maxDiff = (maxMin - minMax) * 2;

  for (let index = 1; index < n; index++) {
    const a = nums[index - 1];
    const b = nums[index];
    const diff = Math.abs(a - b);
    const headDiff = Math.abs(nums[0] - b) - diff;
    const tailDiff = Math.abs(nums[n - 1] - a) - diff;

    maxDiff = Math.max(maxDiff, headDiff, tailDiff);
  }
  return total + maxDiff;
};
