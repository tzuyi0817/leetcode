/**
 * @param {number[]} nums
 * @return {number}
 */
const subsequencePairCount = function (nums) {
  const n = nums.length;
  const MODULO = 10 ** 9 + 7;
  const maxNum = Math.max(...nums);
  const dp = Array.from({ length: n }, () => {
    return new Array(maxNum + 1).fill('').map(_ => new Array(maxNum + 1).fill(-1));
  });

  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  const getPairCount = (index, x, y) => {
    if (index >= n) return x > 0 && x === y ? 1 : 0;

    if (dp[index][x][y] !== -1) return dp[index][x][y];

    const num = nums[index];
    const skip = getPairCount(index + 1, x, y);
    const pickX = getPairCount(index + 1, gcd(num, x), y);
    const pickY = getPairCount(index + 1, x, gcd(num, y));
    const result = (skip + pickX + pickY) % MODULO;

    dp[index][x][y] = result;

    return result;
  };

  return getPairCount(0, 0, 0);
};
