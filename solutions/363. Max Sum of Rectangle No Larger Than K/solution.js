/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
const maxSumSubmatrix = function (matrix, k) {
  const m = matrix.length;
  const n = matrix[0].length;
  let result = Number.MIN_SAFE_INTEGER;

  for (let upperRow = 0; upperRow < m; upperRow++) {
    const prefixCol = Array(n).fill(0);

    for (let row = upperRow; row < m; row++) {
      let sum = 0;
      let maxSubSum = Number.MIN_SAFE_INTEGER;

      for (let col = 0; col < n; col++) {
        prefixCol[col] += matrix[row][col];
        sum = Math.max(prefixCol[col], sum + prefixCol[col]);
        maxSubSum = Math.max(sum, maxSubSum);
      }
      if (maxSubSum === k) return maxSubSum;
      if (maxSubSum < k) {
        result = Math.max(maxSubSum, result);
        continue;
      }
      maxSubSum = Number.MIN_SAFE_INTEGER;

      for (let leftCol = 0; leftCol < n; leftCol++) {
        let sum = 0;

        for (let col = leftCol; col < n; col++) {
          sum += prefixCol[col];
          if (sum > k) continue;
          maxSubSum = Math.max(sum, maxSubSum);
        }
        result = Math.max(maxSubSum, result);
      }
      if (result === k) return result;
    }
  }
  return result;
};
