/**
 * @param {number[][]} towers
 * @param {number} radius
 * @return {number[]}
 */
const bestCoordinate = function (towers, radius) {
  let minX = (minY = 50);
  let maxX = (maxY = maxQ = 0);
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
        const distance = Math.sqrt((a - x) ** 2 + (b - y) ** 2);

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
