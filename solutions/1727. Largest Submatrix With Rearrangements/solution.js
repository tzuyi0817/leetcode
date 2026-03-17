/**
 * @param {number[][]} matrix
 * @return {number}
 */
const largestSubmatrix = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const prefixMatrix = [...matrix.map(row => [...row])];
  let result = 0;

  for (let row = 1; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (!prefixMatrix[row][col]) continue;

      prefixMatrix[row][col] += prefixMatrix[row - 1][col];
    }
  }

  for (let row = 0; row < m; row++) {
    prefixMatrix[row].sort((a, b) => b - a);

    for (let col = 0; col < n; col++) {
      const area = prefixMatrix[row][col] * (col + 1);

      result = Math.max(area, result);
    }
  }

  return result;
};
