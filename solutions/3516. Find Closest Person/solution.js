/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {number}
 */
const findClosest = function (x, y, z) {
  const stepX = Math.abs(x - z);
  const stepY = Math.abs(y - z);

  if (stepX < stepY) return 1;
  if (stepX > stepY) return 2;

  return 0;
};
