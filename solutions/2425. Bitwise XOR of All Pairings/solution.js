/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const xorAllNums = function (nums1, nums2) {
  const n = nums1.length;
  const m = nums2.length;
  const xor1 = nums1.reduce((result, num) => result ^ num);
  const xor2 = nums2.reduce((result, num) => result ^ num);

  return ((n % 2) * xor2) ^ ((m % 2) * xor1);
};
