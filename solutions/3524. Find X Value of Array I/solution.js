/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const resultArray = function (nums, k) {
  const result = Array.from({ length: k }, () => 0);
  let dp = Array.from({ length: k }, () => 0);

  for (const num of nums) {
    const mod = num % k;
    const nextDp = new Array(k).fill(0);

    nextDp[mod] = 1;

    for (let x = 0; x < k; x++) {
      const product = (x * mod) % k;

      nextDp[product] += dp[x];
    }

    for (let x = 0; x < k; x++) {
      result[x] += nextDp[x];
    }

    dp = nextDp;
  }

  return result;
};
