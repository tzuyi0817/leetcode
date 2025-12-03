/**
 * @param {number[][]} points
 * @return {number}
 */
const countTrapezoids = function (points) {
  const n = points.length;
  const slopeMap = new Map();
  const vectorMap = new Map();

  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  const addSide = (map, key, constant) => {
    if (!map.has(key)) {
      map.set(key, new Map());
    }

    const sideMap = map.get(key);
    const count = sideMap.get(constant) ?? 0;

    sideMap.set(constant, count + 1);
  };

  const countTrapezoid = map => {
    let result = 0;

    for (const sideMap of map.values()) {
      let sides = 0;

      for (const count of sideMap.values()) {
        result = result + sides * count;
        sides += count;
      }
    }

    return result;
  };

  for (let a = 0; a < n; a++) {
    const [x1, y1] = points[a];

    for (let b = a + 1; b < n; b++) {
      const [x2, y2] = points[b];
      let dx = x1 - x2;
      let dy = y1 - y2;

      if (dx < 0 || (dx === 0 && dy < 0)) {
        dx = -dx;
        dy = -dy;
      }

      const g = gcd(dx, Math.abs(dy));
      const sx = dx / g;
      const sy = dy / g;
      const constant = sx * y1 - sy * x1;
      const slopeKey = (sx << 12) | (sy + 2000);
      const vectorKey = (dx << 12) | (dy + 2000);

      addSide(slopeMap, slopeKey, constant);
      addSide(vectorMap, vectorKey, constant);
    }
  }

  return countTrapezoid(slopeMap) - countTrapezoid(vectorMap) / 2;
};
