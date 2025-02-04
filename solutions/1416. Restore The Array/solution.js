/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const numberOfArrays = function (s, k) {
  const MODULO = 10 ** 9 + 7;
  const n = s.length;
  const dp = Array.from({ length: n }, () => -1);

  const restoreArray = start => {
    if (start >= n) return 1;
    if (s[start] === '0') return 0;
    if (dp[start] !== -1) return dp[start];
    let result = 0;
    let integer = 0;

    for (let index = start; index < n; index++) {
      const digit = s[index];

      integer = integer * 10 + Number(digit);

      if (integer > k) break;

      result = (result + restoreArray(index + 1)) % MODULO;
    }
    dp[start] = result;

    return result;
  };

  return restoreArray(0);
};
