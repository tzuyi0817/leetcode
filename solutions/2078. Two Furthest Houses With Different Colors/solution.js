/**
 * @param {number[]} colors
 * @return {number}
 */
const maxDistance = function (colors) {
  const n = colors.length;
  let left = 0;
  let right = n - 1;

  while (colors[left] === colors[n - 1]) {
    left += 1;
  }

  while (colors[right] === colors[0]) {
    right -= 1;
  }

  return Math.max(n - left - 1, right);
};
