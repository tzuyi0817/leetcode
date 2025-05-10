/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const minSum = function (nums1, nums2) {
  const nums1Zero = nums1.filter(num => num === 0).length;
  const nums2Zero = nums2.filter(num => num === 0).length;
  const nums1Sum = nums1.reduce((sum, num) => sum + num);
  const nums2Sum = nums2.reduce((sum, num) => sum + num);

  if (nums1Zero === 0 && nums2Zero === 0) {
    return nums1Sum === nums2Sum ? nums1Sum : -1;
  }

  if (nums1Zero === 0) {
    return nums1Sum < nums2Sum + nums2Zero ? -1 : nums1Sum;
  }

  if (nums2Zero === 0) {
    return nums2Sum < nums1Sum + nums1Zero ? -1 : nums2Sum;
  }

  return Math.max(nums1Sum + nums1Zero, nums2Sum + nums2Zero);
};
