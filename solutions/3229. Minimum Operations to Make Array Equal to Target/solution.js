/**
 * @param {number[]} nums
 * @param {number[]} target
 * @return {number}
 */
const minimumOperations = function (nums, target) {
  const n = nums.length;
  let prevDiff = target[0] - nums[0];
  let result = Math.abs(prevDiff);

  for (let index = 1; index < n; index++) {
    const diff = target[index] - nums[index];

    if (diff >= 0 && prevDiff >= 0) {
      const ops = Math.max(0, diff - prevDiff);

      result += ops;
    } else if (diff <= 0 && prevDiff <= 0) {
      const ops = Math.max(0, prevDiff - diff);

      result += ops;
    } else {
      result += Math.abs(diff);
    }

    prevDiff = diff;
  }

  return result;
};
