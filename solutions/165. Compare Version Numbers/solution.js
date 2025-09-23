/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
const compareVersion = function (version1, version2) {
  const nums1 = version1.split('.');
  const nums2 = version2.split('.');
  const n = Math.max(nums1.length, nums2.length);

  for (let index = 0; index < n; index++) {
    const num1 = nums1[index] ? Number(nums1[index]) : 0;
    const num2 = nums2[index] ? Number(nums2[index]) : 0;

    if (num1 < num2) return -1;
    if (num1 > num2) return 1;
  }

  return 0;
};
