/**
 * @param {number[][]} towers
 * @param {number} radius
 * @return {number[]}
 */
const bestCoordinate = function (towers, radius) {
  let minX = 50;
  let minY = 50;
  let maxX = 0;
  let maxY = 0;
  let maxQ = 0;
  let result = [0, 0];

  towers.forEach(([x, y]) => {
    minX = Math.min(x, minX);
    minY = Math.min(y, minY);
    maxX = Math.max(x, maxX);
    maxY = Math.max(y, maxY);
  });

  for (let a = minX; a <= maxX; a++) {
    for (let b = minY; b <= maxY; b++) {
      let quality = 0;

      for (const [x, y, q] of towers) {
        const distance = Math.hypot(a - x, b - y);

        if (distance > radius) continue;
        quality += Math.floor(q / (1 + distance));
      }
      if (quality <= maxQ) continue;
      result = [a, b];
      maxQ = quality;
    }
  }
  return result;
};
