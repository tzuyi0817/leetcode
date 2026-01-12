/**
 * @param {number[][]} points
 * @return {number}
 */
const minTimeToVisitAllPoints = function (points) {
  const n = points.length;
  let result = 0;

  for (let index = 1; index < n; index++) {
    const [x1, y1] = points[index - 1];
    const [x2, y2] = points[index];
    const diffX = Math.abs(x1 - x2);
    const diffY = Math.abs(y1 - y2);

    result += Math.max(diffX, diffY);
  }

  return result;
};
