/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const sumOfPower = function (nums, k) {
  const MODULO = BigInt(10 ** 9 + 7);
  const n = nums.length;
  const dp = Array.from({ length: n }, () => new Array(k + 1).fill(-1));

  const getSubsequences = (index, sum) => {
    if (sum === k) {
      return modPow(2n, BigInt(n - index), MODULO);
    }

    if (sum > k || index >= n) return 0n;

    if (dp[index][sum] !== -1) return dp[index][sum];

    const skip = getSubsequences(index + 1, sum);
    const pick = getSubsequences(index + 1, sum + nums[index]);
    const result = (pick + 2n * skip) % MODULO;

    dp[index][sum] = result;

    return result;
  };

  return Number(getSubsequences(0, 0));
};

function modPow(base, exp, mod) {
  let result = 1n;

  while (exp) {
    if (exp % 2n) {
      result = (result * base) % mod;
    }

    base = (base * base) % mod;
    exp /= 2n;
  }

  return result;
}
