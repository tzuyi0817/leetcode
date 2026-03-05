/**
 * @param {number[]} nums
 * @return {number}
 */
const countQuadruplets = function (nums) {
  const n = nums.length;
  const dp = Array.from({ length: n }, () => 0);
  let result = 0;

  for (let k = 2; k < n; k++) {
    let lessThanK = 0;

    for (let j = 0; j < k; j++) {
      if (nums[j] < nums[k]) {
        lessThanK += 1;
        result += dp[j];
      } else {
        dp[j] += lessThanK;
      }
    }
  }

  return result;
};
