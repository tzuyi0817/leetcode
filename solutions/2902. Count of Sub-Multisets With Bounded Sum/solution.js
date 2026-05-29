/**
 * @param {number[]} nums
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
const countSubMultisets = function (nums, l, r) {
  const numMap = new Map();

  for (const num of nums) {
    const count = numMap.get(num) ?? 0;

    numMap.set(num, count + 1);
  }

  const MODULO = BigInt(10 ** 9 + 7);
  const zeros = numMap.get(0) ?? 0;
  const dp = Array.from({ length: r + 1 }, () => 0n);

  numMap.delete(0);
  dp[0] = 1n;

  const sortedNums = [...numMap.entries()].toSorted((a, b) => a[0] - b[0]);
  let result = 0n;

  for (const [num, count] of sortedNums) {
    const stride = [...dp];

    for (let index = num; index <= r; index++) {
      stride[index] += stride[index - num];
    }

    for (let index = r; index > 0; index--) {
      const sum = num * count;

      if (index >= sum + num) {
        dp[index] = stride[index] - stride[index - sum - num];
      } else {
        dp[index] = stride[index];
      }
    }
  }

  for (let index = l; index <= r; index++) {
    result += dp[index];
  }

  return Number((result * BigInt(zeros + 1)) % MODULO);
};
