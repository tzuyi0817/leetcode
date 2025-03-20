/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const maxSum = function (nums1, nums2) {
  const MODULO = 10 ** 9 + 7;
  const m = nums1.length;
  const n = nums2.length;
  let a = 0;
  let b = 0;
  let sum1 = 0;
  let sum2 = 0;
  let result = 0;

  while (a < m && b < n) {
    if (nums1[a] < nums2[b]) {
      sum1 += nums1[a];
      a += 1;
    } else if (nums1[a] > nums2[b]) {
      sum2 += nums2[b];
      b += 1;
    } else {
      result = (result + Math.max(sum1, sum2) + nums1[a]) % MODULO;
      sum1 = 0;
      sum2 = 0;
      a += 1;
      b += 1;
    }
  }

  while (a < m) {
    sum1 += nums1[a];
    a += 1;
  }

  while (b < n) {
    sum2 += nums2[b];
    b += 1;
  }

  return (result + Math.max(sum1, sum2)) % MODULO;
};
