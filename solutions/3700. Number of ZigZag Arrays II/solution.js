/**
 * @param {number} n
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
const zigZagArrays = function (n, l, r) {
  const m = r - l + 1;

  if (n === 1) return m;

  const MODULO = BigInt(10 ** 9 + 7);
  let matrix = Array.from({ length: m }, (_, a) => {
    return Array.from({ length: m }, (_, b) => (a + b + 1 < m ? 1n : 0n));
  });
  let result = Array.from({ length: m }, () => 1n);
  let count = n - 1;

  while (count) {
    if (count % 2) {
      result = multiplyVectorMatrix(result, matrix, MODULO);
    }

    matrix = multiplyMatrixMatrix(matrix, matrix, MODULO);
    count = Math.floor(count / 2);
  }

  const sum = result.reduce((total, count) => total + count);

  return Number((sum * 2n) % MODULO);
};

function multiplyVectorMatrix(vector, matrix, mod) {
  const n = vector.length;
  const result = new Array(n).fill(0n);

  for (let a = 0; a < n; a++) {
    for (let b = 0; b < n; b++) {
      result[a] += vector[b] * matrix[a][b];
    }

    result[a] %= mod;
  }

  return result;
}

function multiplyMatrixMatrix(matA, matB, mod) {
  const m = matA.length;
  const n = matA[0].length;
  const p = matB[0].length;
  const result = Array.from({ length: m }, () => new Array(n).fill(0n));

  for (let a = 0; a < m; a++) {
    for (let b = 0; b < p; b++) {
      for (let c = 0; c < n; c++) {
        result[a][b] += matA[a][c] * matB[c][b];
      }

      result[a][b] %= mod;
    }
  }

  return result;
}
