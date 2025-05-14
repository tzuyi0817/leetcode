/**
 * @param {string} s
 * @param {number} t
 * @param {number[]} nums
 * @return {number}
 */
const lengthAfterTransformations = function (s, t, nums) {
  const MODULO = BigInt(10 ** 9 + 7);
  const BASE_CODE = 'a'.charCodeAt(0);
  const transformations = Array.from({ length: 26 }, () => new Array(26).fill(0n));

  for (let letter = 0; letter < 26; letter++) {
    for (let step = 1; step <= nums[letter]; step++) {
      const transform = (letter + step) % 26;

      transformations[letter][transform] += 1n;
    }
  }

  const matrixMult = (matrixA, matrixB) => {
    const n = matrixA.length;
    const result = new Array(26).fill('').map(_ => new Array(26).fill(0n));

    for (let a = 0; a < n; a++) {
      for (let b = 0; b < n; b++) {
        for (let k = 0; k < n; k++) {
          const multiple = matrixA[a][k] * matrixB[k][b];

          result[a][b] = (result[a][b] + multiple) % MODULO;
        }
      }
    }

    return result;
  };

  const matrixPow = (matrix, power) => {
    if (!power) {
      const n = matrix.length;
      const result = new Array(n).fill('').map(_ => new Array(n).fill(0n));

      for (let index = 0; index < n; index++) {
        result[index][index] = 1n;
      }

      return result;
    }

    if (power % 2) {
      return matrixMult(matrix, matrixPow(matrix, power - 1));
    }
    const halfMatrix = matrixPow(matrix, power / 2);

    return matrixMult(halfMatrix, halfMatrix);
  };

  const poweredTransformations = matrixPow(transformations, t);
  const counts = Array.from({ length: 26 }, () => 0n);
  const lengths = Array.from({ length: 26 }, () => 0n);

  for (const letter of s) {
    const code = letter.charCodeAt(0) - BASE_CODE;

    counts[code] += 1n;
  }

  for (let a = 0; a < 26; a++) {
    for (let b = 0; b < 26; b++) {
      lengths[a] = (lengths[a] + counts[a] * poweredTransformations[a][b]) % MODULO;
    }
  }

  return Number(lengths.reduce((result, length) => (result + length) % MODULO));
};
