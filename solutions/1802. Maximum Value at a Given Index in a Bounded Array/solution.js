/**
 * @param {number} n
 * @param {number} index
 * @param {number} maxSum
 * @return {number}
 */
const maxValue = function (n, index, maxSum) {
  let left = index;
  let right = index;
  let result = 1;

  maxSum -= n;

  while (left > 0 || right < n - 1) {
    const gap = right - left + 1;

    if (maxSum < gap) break;
    maxSum -= gap;
    result += 1;
    left = Math.max(0, left - 1);
    right = Math.min(n - 1, right + 1);
  }
  return result + Math.floor(maxSum / n);
};
