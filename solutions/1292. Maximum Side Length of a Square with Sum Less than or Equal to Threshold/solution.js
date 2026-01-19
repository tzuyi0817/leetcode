/**
 * @param {number[][]} mat
 * @param {number} threshold
 * @return {number}
 */
const maxSideLength = function (mat, threshold) {
  const m = mat.length;
  const n = mat[0].length;
  const prefixSum = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  let left = 0;
  let right = Math.min(m, n);
  let result = 0;

  for (let row = 1; row <= m; row++) {
    for (let col = 1; col <= n; col++) {
      const value = mat[row - 1][col - 1];
      const preRowSum = prefixSum[row - 1][col];
      const preColSum = prefixSum[row][col - 1];
      const cornerSum = prefixSum[row - 1][col - 1];

      prefixSum[row][col] = preRowSum + preColSum + value - cornerSum;
    }
  }

  const isValidSideLength = len => {
    if (!len) return true;

    for (let row = len; row <= m; row++) {
      for (let col = len; col <= n; col++) {
        const preRowSum = prefixSum[row - len][col];
        const preColSum = prefixSum[row][col - len];
        const cornerSum = prefixSum[row - len][col - len];
        const sum = prefixSum[row][col] - preRowSum - preColSum + cornerSum;

        if (sum <= threshold) return true;
      }
    }

    return false;
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (isValidSideLength(mid)) {
      result = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
};
