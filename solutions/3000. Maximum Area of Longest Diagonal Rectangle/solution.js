/**
 * @param {number[][]} dimensions
 * @return {number}
 */
const areaOfMaxDiagonal = function (dimensions) {
  let maxDiagonal = 0;
  let result = 0;

  for (const [length, width] of dimensions) {
    const diagonal = Math.hypot(length, width);

    if (diagonal < maxDiagonal) continue;

    const area = length * width;

    result = diagonal === maxDiagonal ? Math.max(area, result) : area;
    maxDiagonal = diagonal;
  }

  return result;
};
