/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const minimumTotalCost = function (nums1, nums2) {
  const n = nums1.length;
  const countMap = new Map();
  let maxFreq = 0;
  let maxFreqNum = 0;
  let shouldSwapped = 0;
  let result = 0;

  for (let index = 0; index < n; index++) {
    if (nums1[index] !== nums2[index]) continue;

    const num = nums1[index];
    const count = (countMap.get(num) ?? 0) + 1;

    if (count > maxFreq) {
      maxFreq = count;
      maxFreqNum = num;
    }

    countMap.set(num, count);
    shouldSwapped += 1;
    result += index;
  }

  for (let index = 0; index < n; index++) {
    if (maxFreq * 2 <= shouldSwapped) return result;

    if (nums1[index] === nums2[index]) continue;

    if (nums1[index] === maxFreqNum || nums2[index] === maxFreqNum) continue;

    shouldSwapped += 1;
    result += index;
  }

  return maxFreq * 2 > shouldSwapped ? -1 : result;
};
