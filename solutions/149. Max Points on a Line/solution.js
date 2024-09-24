/**
 * @param {number[][]} points
 * @return {number}
 */
const maxPoints = function (points) {
  const n = points.length;
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const getSlope = (x1, y1, x2, y2) => {
    if (x1 === x2) return `0,${y1}`;
    if (y1 === y2) return `${x1},0`;
    const dx = x1 - x2;
    const dy = y1 - y2;
    const d = gcd(dx, dy);

    return `${dx / d},${dy / d}`;
  };
  let result = 0;

  for (let a = 0; a < n; a++) {
    const [x1, y1] = points[a];
    const straightMap = new Map();
    let samePoint = 1;
    let sameStraight = 0;

    for (let b = a + 1; b < n; b++) {
      const [x2, y2] = points[b];

      if (x1 === x2 && y1 === y2) {
        samePoint += 1;
        continue;
      }
      const slope = getSlope(x1, y1, x2, y2);
      const count = straightMap.get(slope) ?? 0;

      straightMap.set(slope, count + 1);
      sameStraight = Math.max(count + 1, sameStraight);
    }
    result = Math.max(samePoint + sameStraight, result);
  }
  return result;
};
