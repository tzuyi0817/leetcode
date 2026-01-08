/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const maxDotProduct = function (nums1, nums2) {
  const m = nums1.length;
  const n = nums2.length;
  const dp = Array.from({ length: m }, () => new Array(n).fill(null));

  const maxSubProduct = (index1, index2) => {
    if (index1 >= m || index2 >= n) return Number.MIN_SAFE_INTEGER;
    if (dp[index1][index2] !== null) return dp[index1][index2];

    const product = nums1[index1] * nums2[index2];
    const current = product + maxSubProduct(index1 + 1, index2 + 1);
    const skip1 = maxSubProduct(index1 + 1, index2);
    const skip2 = maxSubProduct(index1, index2 + 1);
    const result = Math.max(product, current, skip1, skip2);

    dp[index1][index2] = result;

    return result;
  };

  return maxSubProduct(0, 0);
};
