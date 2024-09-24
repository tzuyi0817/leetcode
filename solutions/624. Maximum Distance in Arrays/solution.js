/**
 * @param {number[][]} arrays
 * @return {number}
 */
const maxDistance = function (arrays) {
  let maxNum = Number.MIN_SAFE_INTEGER;
  let minNum = Number.MAX_SAFE_INTEGER;
  let result = 0;

  for (const nums of arrays) {
    const distance1 = maxNum - nums[0];
    const distance2 = nums.at(-1) - minNum;

    result = Math.max(distance1, distance2, result);
    maxNum = Math.max(nums.at(-1), maxNum);
    minNum = Math.min(nums[0], minNum);
  }
  return result;
};
