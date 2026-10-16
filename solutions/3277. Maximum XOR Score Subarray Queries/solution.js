/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
const maximumSubarrayXor = function (nums, queries) {
  const n = nums.length;
  const xors = Array.from({ length: n }, () => new Array(n).fill(0));
  const dp = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    xors[index][index] = num;
    dp[index][index] = num;
  }

  for (let count = 2; count <= n; count++) {
    for (let l = 0; l + count <= n; l++) {
      const r = l + count - 1;

      xors[l][r] = xors[l][r - 1] ^ xors[l + 1][r];
      dp[l][r] = Math.max(dp[l][r - 1], dp[l + 1][r], xors[l][r]);
    }
  }

  return queries.map(([l, r]) => dp[l][r]);
};
