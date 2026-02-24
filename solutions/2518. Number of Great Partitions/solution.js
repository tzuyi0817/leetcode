/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const countPartitions = function (nums, k) {
  const n = nums.length;
  const MODULO = BigInt(10 ** 9 + 7);
  const sum = nums.reduce((total, num) => total + num);

  const modPow = (base, exponent) => {
    let result = 1n;

    while (exponent) {
      if (exponent % 2n) {
        result = (result * base) % MODULO;
      }

      base = (base * base) % MODULO;
      exponent /= 2n;
    }

    return result;
  };

  const dp = Array.from({ length: k + 1 }, () => 0n);
  let result = modPow(2n, BigInt(n));

  dp[0] = 1n;

  for (const num of nums) {
    for (let index = k; index >= num; index--) {
      dp[index] = (dp[index] + dp[index - num]) % MODULO;
    }
  }

  for (let index = 0; index < k; index++) {
    if (sum - index < k) {
      result -= dp[index];
    } else {
      result -= dp[index] * 2n;
    }
  }

  return Number(((result % MODULO) + MODULO) % MODULO);
};
