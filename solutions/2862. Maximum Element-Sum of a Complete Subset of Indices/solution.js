/**
 * @param {number[]} nums
 * @return {number}
 */
const maximumSum = function (nums) {
  const n = nums.length;
  let result = 0;

  for (let core = 1; core <= n; core++) {
    let sum = 0;

    for (let k = 1; core * k * k <= n; k++) {
      const index = core * k * k;

      sum += nums[index - 1];
    }

    result = Math.max(sum, result);
  }

  return result;
};
