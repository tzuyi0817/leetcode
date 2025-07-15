/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const minimumXORSum = function (nums1, nums2) {
  const n = nums1.length;
  const dp = Array.from({ length: 1 << n }, () => Number.MAX_SAFE_INTEGER);

  const sumXor = (index, mask) => {
    if (index >= n) return 0;
    if (dp[mask] !== Number.MAX_SAFE_INTEGER) return dp[mask];
    const num = nums1[index];
    let result = Number.MAX_SAFE_INTEGER;

    for (let bit = 0; bit < n; bit++) {
      if (mask & (1 << bit)) continue;
      const xor = num ^ nums2[bit];
      const sum = xor + sumXor(index + 1, mask | (1 << bit));

      result = Math.min(sum, result);
    }

    dp[mask] = result;

    return result;
  };

  return sumXor(0, 0);
};
