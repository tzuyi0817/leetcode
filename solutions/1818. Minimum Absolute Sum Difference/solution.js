/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const minAbsoluteSumDiff = function (nums1, nums2) {
  const MODULO = 10 ** 9 + 7;
  const clone = [...nums1].sort((a, b) => a - b);
  const size = nums1.length;
  const findNearPosition = target => {
    let left = 0;
    let right = size - 1;

    if (clone[right] < target) return right + 1;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      clone[mid] < target ? (left = mid + 1) : (right = mid);
    }
    return left;
  };
  let result = 0;
  let max = 0;

  for (let index = 0; index < size; index++) {
    const a = nums1[index];
    const b = nums2[index];
    const diff = Math.abs(a - b);

    result = (result + diff) % MODULO;
    const absolute = findNearPosition(b);
    const next = clone[absolute] ? clone[absolute] - b : diff;
    const previous = clone[absolute - 1] ? b - clone[absolute - 1] : diff;

    max = Math.max(max, diff - next, diff - previous);
  }
  return (result + MODULO - max) % MODULO;
};
