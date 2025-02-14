/**
 * @param {number[][]} darts
 * @param {number} r
 * @return {number}
 */
const numPoints = function (darts, r) {
  const getDistance = (x1, x2, y1, y2) => {
    return Math.hypot(x1 - x2, y1 - y2);
  };

  const getCircularCenters = (x1, x2, y1, y2) => {
    const distance = getDistance(x1, x2, y1, y2);

    if (distance > r * 2) return [];
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const h = Math.sqrt(r ** 2 - (distance / 2) ** 2);
    const dx = (x2 - x1) / distance;
    const dy = (y2 - y1) / distance;
    const center1 = { cx: mx - h * dy, cy: my + h * dx };
    const center2 = { cx: mx + h * dy, cy: my - h * dx };

    return [center1, center2];
  };

  const n = darts.length;
  let result = 1;

  for (let a = 0; a < n - 1; a++) {
    const [x1, y1] = darts[a];

    for (let b = a + 1; b < n; b++) {
      const [x2, y2] = darts[b];
      const centers = getCircularCenters(x1, x2, y1, y2);

      for (const { cx, cy } of centers) {
        let points = 0;

        for (const [x, y] of darts) {
          const distance = getDistance(x, cx, y, cy);

          points += distance <= r ? 1 : 0;
        }

        result = Math.max(points, result);
      }
    }
  }

  return result;
};
