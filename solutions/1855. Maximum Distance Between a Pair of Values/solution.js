/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const maxDistance = function (nums1, nums2) {
  const MAX_SIZE = nums2.length;
  let result = 0;
  let end = 0;

  for (const [start, num1] of nums1.entries()) {
    while (end < MAX_SIZE && num1 <= nums2[end]) {
      result = Math.max(end - start, result);
      end += 1;
    }
  }
  return result;
};
