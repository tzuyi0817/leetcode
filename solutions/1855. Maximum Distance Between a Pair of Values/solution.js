/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const maxDistance = function (nums1, nums2) {
  const MAX_SIZE = nums2.length;
  let result = (end = 0);

  for (let start = 0; start < nums1.length; start++) {
    const num1 = nums1[start];

    while (end < MAX_SIZE && num1 <= nums2[end]) {
      result = Math.max(end - start, result);
      end += 1;
    }
  }
  return result;
};
