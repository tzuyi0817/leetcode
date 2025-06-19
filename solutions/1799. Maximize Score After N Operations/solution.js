/**
 * @param {number[]} nums
 * @return {number}
 */
const maxScore = function (nums) {
  const n = nums.length;
  const totalMask = (1 << n) - 1;
  const dp = Array.from({ length: totalMask + 1 }, () => -1);

  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  const receiveScore = (mask, i) => {
    if (mask === totalMask) return 0;
    if (dp[mask] !== -1) return dp[mask];
    let result = 0;

    for (let a = 0; a < n - 1; a++) {
      if (mask & (1 << a)) continue;

      for (let b = a + 1; b < n; b++) {
        if (mask & (1 << b)) continue;
        const score = i * gcd(nums[a], nums[b]);
        const nextMask = mask | (1 << a) | (1 << b);
        const totalScore = score + receiveScore(nextMask, i + 1);

        result = Math.max(totalScore, result);
      }
    }

    dp[mask] = result;

    return result;
  };

  return receiveScore(0, 1);
};
