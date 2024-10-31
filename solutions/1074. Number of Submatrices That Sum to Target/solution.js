/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {number}
 */
const numSubmatrixSumTarget = function (matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;
  let result = 0;

  for (let row = 0; row < m; row++) {
    for (let col = 1; col < n; col++) {
      matrix[row][col] += matrix[row][col - 1];
    }
  }

  for (let left = 0; left < n; left++) {
    for (let right = left; right < n; right++) {
      const sumCountMap = new Map([[0, 1]]);
      let sum = 0;

      for (let row = 0; row < m; row++) {
        sum += matrix[row][right];

        if (left > 0) sum -= matrix[row][left - 1];

        result += sumCountMap.get(sum - target) ?? 0;
        sumCountMap.set(sum, (sumCountMap.get(sum) ?? 0) + 1);
      }
    }
  }
  return result;
};
