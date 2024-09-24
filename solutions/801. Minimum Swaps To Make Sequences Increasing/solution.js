/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const minSwap = function (nums1, nums2) {
  const n = nums1.length;
  let swap = 1;
  let noSwap = 0;

  for (let index = 1; index < n; index++) {
    let currentSwap = (currentNoSwap = n);

    if (nums1[index] > nums1[index - 1] && nums2[index] > nums2[index - 1]) {
      currentSwap = swap + 1;
      currentNoSwap = noSwap;
    }
    if (nums1[index] > nums2[index - 1] && nums2[index] > nums1[index - 1]) {
      currentSwap = Math.min(currentSwap, noSwap + 1);
      currentNoSwap = Math.min(currentNoSwap, swap);
    }
    swap = currentSwap;
    noSwap = currentNoSwap;
  }
  return Math.min(swap, noSwap);
};
