/**
 * @param {number[]} rec1
 * @param {number[]} rec2
 * @return {boolean}
 */
const isRectangleOverlap = function (rec1, rec2) {
  const [x1, y1, x2, y2] = rec1;
  const [x3, y3, x4, y4] = rec2;

  if (x3 >= x2) return false;

  if (x4 <= x1) return false;

  if (y3 >= y2) return false;

  if (y4 <= y1) return false;

  return true;
};
