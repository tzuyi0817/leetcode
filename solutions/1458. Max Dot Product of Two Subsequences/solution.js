/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const maxDotProduct = function (nums1, nums2) {
  const m = nums1.length;
  const n = nums2.length;
  const dp = Array.from({ length: m }, () => new Array(n).fill(Number.MIN_SAFE_INTEGER));

  const subProduct = (a, b) => {
    if (a >= m || b >= n) return Number.MIN_SAFE_INTEGER;
    if (dp[a][b] !== Number.MIN_SAFE_INTEGER) return dp[a][b];
    const ignoreA = subProduct(a + 1, b);
    const ignoreB = subProduct(a, b + 1);
    const product = nums1[a] * nums2[b];
    const totalProduct = product + subProduct(a + 1, b + 1);
    const result = Math.max(ignoreA, ignoreB, product, totalProduct);

    dp[a][b] = result;

    return result;
  };

  return subProduct(0, 0);
};
