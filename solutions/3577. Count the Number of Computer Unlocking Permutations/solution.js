/**
 * @param {number[]} complexity
 * @return {number}
 */
const countPermutations = function (complexity) {
  const n = complexity.length;
  const MODULO = 10 ** 9 + 7;
  const minComplexity = complexity[0];

  for (let index = 1; index < n; index++) {
    if (complexity[index] <= minComplexity) {
      return 0;
    }
  }

  let result = 1;

  for (let num = 2; num < n; num++) {
    result = (result * num) % MODULO;
  }

  return result;
};
