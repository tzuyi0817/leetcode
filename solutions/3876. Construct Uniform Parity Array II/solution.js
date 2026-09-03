/**
 * @param {number[]} nums1
 * @return {boolean}
 */
const uniformArray = function (nums1) {
  if (nums1.every(num => num % 2 === 0)) return true;

  let minOdd = Number.MAX_SAFE_INTEGER;

  for (const num of nums1) {
    if (num % 2) {
      minOdd = Math.min(num, minOdd);
    }
  }

  for (const num of nums1) {
    if (num % 2) continue;

    if (num - minOdd < 1) return false;
  }

  return true;
};
