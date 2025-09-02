/**
 * @param {number[][]} points
 * @return {number}
 */
const numberOfPairs = function (points) {
  const n = points.length;
  let result = 0;

  points.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

  for (let a = 0; a < n - 1; a++) {
    const y1 = points[a][1];
    let maxY = Number.MIN_SAFE_INTEGER;

    for (let b = a + 1; b < n; b++) {
      const y2 = points[b][1];

      if (y1 < y2 || y2 <= maxY) continue;

      result += 1;
      maxY = y2;
    }
  }

  return result;
};
