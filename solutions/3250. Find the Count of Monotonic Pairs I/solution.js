/**
 * @param {number[]} nums
 * @return {number}
 */
const countOfPairs = function (nums) {
  const MODULO = 10 ** 9 + 7;
  const n = nums.length;
  const maxNum = Math.max(...nums);
  const dp = Array.from({ length: n }, () => {
    return new Array(maxNum + 1).fill(-1);
  });

  const getPairs = (index, prevA) => {
    if (index >= n) return 1;

    if (dp[index][prevA] !== -1) {
      return dp[index][prevA];
    }

    const num = nums[index];
    const prevB = index ? nums[index - 1] - prevA : maxNum;
    const start = Math.max(prevA, num - prevB);
    let result = 0;

    for (let a = start; a <= num; a++) {
      const count = getPairs(index + 1, a);

      result = (count + result) % MODULO;
    }

    dp[index][prevA] = result;

    return result;
  };

  return getPairs(0, 0);
};
