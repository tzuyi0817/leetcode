/**
 * @param {number[][]} rectangles
 * @return {boolean}
 */
const isRectangleCover = function (rectangles) {
  const pointSet = new Set();
  let minX = (minY = Number.MAX_SAFE_INTEGER);
  let maxX = (maxY = Number.MIN_SAFE_INTEGER);
  let area = 0;

  for (const [x1, y1, x2, y2] of rectangles) {
    const point1 = `${x1}_${y1}`;
    const point2 = `${x1}_${y2}`;
    const point3 = `${x2}_${y1}`;
    const point4 = `${x2}_${y2}`;

    minX = Math.min(x1, minX);
    minY = Math.min(y1, minY);
    maxX = Math.max(x2, maxX);
    maxY = Math.max(y2, maxY);
    area += (x2 - x1) * (y2 - y1);
    pointSet.has(point1) ? pointSet.delete(point1) : pointSet.add(point1);
    pointSet.has(point2) ? pointSet.delete(point2) : pointSet.add(point2);
    pointSet.has(point3) ? pointSet.delete(point3) : pointSet.add(point3);
    pointSet.has(point4) ? pointSet.delete(point4) : pointSet.add(point4);
  }
  if (pointSet.size !== 4) return false;
  if (!pointSet.has(`${minX}_${minY}`)) return false;
  if (!pointSet.has(`${minX}_${maxY}`)) return false;
  if (!pointSet.has(`${maxX}_${minY}`)) return false;
  if (!pointSet.has(`${maxX}_${maxY}`)) return false;

  return (maxX - minX) * (maxY - minY) === area;
};
