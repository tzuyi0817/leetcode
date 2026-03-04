/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minCost = function (nums, k) {
  const n = nums.length;
  const trimmed = Array.from({ length: n }, () => new Array(n).fill(0));
  const dp = Array.from({ length: n + 1 }, () => Number.MAX_SAFE_INTEGER);

  for (let a = 0; a < n; a++) {
    const counts = new Array(n + 1).fill(0);
    let len = 0;

    for (let b = a; b < n; b++) {
      const num = nums[b];

      counts[num] += 1;

      if (counts[num] === 2) {
        len += 2;
      } else if (counts[num] > 2) {
        len += 1;
      }

      trimmed[a][b] = len;
    }
  }

  dp[n] = 0;

  for (let a = n - 1; a >= 0; a--) {
    for (let b = a; b < n; b++) {
      const cost = k + trimmed[a][b] + dp[b + 1];

      dp[a] = Math.min(cost, dp[a]);
    }
  }

  return dp[0];
};
