/**
 * @param {number[]} nums
 * @param {number} target
 * @param {number} start
 * @return {number}
 */
const getMinDistance = function (nums, target, start) {
  const n = nums.length;
  let result = n;

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    if (num === target) {
      const value = Math.abs(index - start);

      result = Math.min(value, result);
    }
  }

  return result;
};
