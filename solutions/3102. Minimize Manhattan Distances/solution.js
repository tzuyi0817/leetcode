/**
 * @param {number[][]} points
 * @return {number}
 */
const minimumDistance = function (points) {
  const n = points.length;

  const getMaxManhattanDistance = (excludedIndex = -1) => {
    let maxSum = Number.MIN_SAFE_INTEGER;
    let minSum = Number.MAX_SAFE_INTEGER;
    let maxDiff = Number.MIN_SAFE_INTEGER;
    let minDiff = Number.MAX_SAFE_INTEGER;
    let maxSumIndex = -1;
    let minSumIndex = -1;
    let maxDiffIndex = -1;
    let minDiffIndex = -1;

    for (let index = 0; index < n; index++) {
      if (index === excludedIndex) continue;

      const [x, y] = points[index];
      const sum = x + y;
      const diff = x - y;

      if (sum > maxSum) {
        maxSum = sum;
        maxSumIndex = index;
      }

      if (sum < minSum) {
        minSum = sum;
        minSumIndex = index;
      }

      if (diff > maxDiff) {
        maxDiff = diff;
        maxDiffIndex = index;
      }

      if (diff < minDiff) {
        minDiff = diff;
        minDiffIndex = index;
      }
    }

    if (maxSum - minSum > maxDiff - minDiff) {
      return [minSumIndex, maxSumIndex];
    }

    return [minDiffIndex, maxDiffIndex];
  };

  const manhattan = (a, b) => {
    const [x1, y1] = points[a];
    const [x2, y2] = points[b];

    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  };

  const [excludedA, excludedB] = getMaxManhattanDistance();
  const [a, b] = getMaxManhattanDistance(excludedA);
  const [c, d] = getMaxManhattanDistance(excludedB);

  return Math.min(manhattan(a, b), manhattan(c, d));
};
