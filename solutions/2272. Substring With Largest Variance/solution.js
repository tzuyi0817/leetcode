/**
 * @param {string} s
 * @return {number}
 */
const largestVariance = function (s) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const codes = [...s].map(char => char.charCodeAt(0) - BASE_CODE);
  let result = 0;

  const kadane = (a, b) => {
    let countA = 0;
    let countB = 0;
    let variance = 0;
    let hasPrevB = false;

    for (const code of codes) {
      if (code !== a && code !== b) continue;

      if (code === a) {
        countA += 1;
      } else {
        countB += 1;
      }

      if (countB > 0) {
        variance = Math.max(countA - countB, variance);
      } else if (hasPrevB) {
        variance = Math.max(countA - 1, variance);
      }

      if (countB > countA) {
        countA = 0;
        countB = 0;
        hasPrevB = true;
      }
    }

    return variance;
  };

  for (let a = 0; a < 26; a++) {
    for (let b = 0; b < 26; b++) {
      if (a === b) continue;

      const variance = kadane(a, b);

      result = Math.max(variance, result);
    }
  }

  return result;
};
