/**
 * @param {string} s
 * @return {number}
 */
const countPalindromes = function (s) {
  const SUBSEQ_SIZE = 5;
  const MODULO = 10 ** 9 + 7;
  let result = 0;

  for (let a = 0; a < 10; a++) {
    for (let b = 0; b < 10; b++) {
      const palindromic = [`${a}`, `${b}`, '#', `${b}`, `${a}`];
      const dp = new Array(SUBSEQ_SIZE + 1).fill(0);

      dp[SUBSEQ_SIZE] = 1;

      for (const char of s) {
        for (let index = 0; index < SUBSEQ_SIZE; index++) {
          const current = palindromic[index];

          if (current === '#' || current === char) {
            dp[index] = (dp[index] + dp[index + 1]) % MODULO;
          }
        }
      }

      result = (result + dp[0]) % MODULO;
    }
  }

  return result;
};
