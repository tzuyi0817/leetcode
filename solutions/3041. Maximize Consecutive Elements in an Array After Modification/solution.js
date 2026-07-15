/**
 * @param {number[]} nums
 * @return {number}
 */
const maxSelectedElements = function (nums) {
  const n = nums.length;
  let dp0 = 1;
  let dp1 = 1;
  let result = 1;

  nums.sort((a, b) => a - b);

  for (let index = 1; index < n; index++) {
    const prev = nums[index - 1];
    const num = nums[index];
    const diff = num - prev;

    switch (diff) {
      case 0: {
        dp1 = dp0 + 1;

        break;
      }
      case 1: {
        dp0 += 1;
        dp1 += 1;

        break;
      }
      case 2: {
        dp0 = dp1 + 1;
        dp1 = 1;

        break;
      }
      default: {
        dp0 = 1;
        dp1 = 1;
      }
    }

    result = Math.max(dp0, dp1, result);
  }

  return result;
};
