/**
 * @param {number[][]} mat
 * @param {number} target
 * @return {number}
 */
const minimizeTheDifference = function (mat, target) {
  const m = mat.length;
  const n = mat[0].length;
  const dp = new Set([0]);
  let result = Number.MAX_SAFE_INTEGER;

  for (let row = 0; row < m; row++) {
    const values = [...dp].toSorted((a, b) => a - b).slice(0, target);

    dp.clear();

    for (let col = 0; col < n; col++) {
      for (const value of values) {
        dp.add(value + mat[row][col]);
      }
    }
  }

  dp.forEach(value => {
    result = Math.min(Math.abs(target - value), result);
  });

  return result;
};
