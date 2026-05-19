/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const getCommon = function (nums1, nums2) {
  const m = nums1.length;
  const n = nums2.length;
  let pos = 0;

  for (let index = 0; index < n; index++) {
    const num2 = nums2[index];

    while (pos < m && nums1[pos] < num2) {
      pos += 1;
    }

    if (nums1[pos] === num2) {
      return num2;
    }
  }

  return -1;
};
