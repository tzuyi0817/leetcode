/**
 * @param {number} n
 * @param {number[]} left
 * @param {number[]} right
 * @return {number}
 */
const getLastMoment = function (n, left, right) {
  const maxLeft = Math.max(...left);
  const minRight = Math.min(...right);

  return Math.max(maxLeft, n - minRight);
};
