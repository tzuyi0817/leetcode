/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const maximumsSplicedArray = function (nums1, nums2) {
  const n = nums1.length;

  const kadane = (a, b) => {
    const sum = a.reduce((result, num) => result + num);
    let gain = 0;
    let maxGain = 0;

    for (let index = 0; index < n; index++) {
      gain = Math.max(gain + b[index] - a[index], 0);
      maxGain = Math.max(gain, maxGain);
    }

    return maxGain + sum;
  };

  return Math.max(kadane(nums1, nums2), kadane(nums2, nums1));
};
