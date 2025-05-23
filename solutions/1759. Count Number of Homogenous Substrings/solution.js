/**
 * @param {string} s
 * @return {number}
 */
const countHomogenous = function (s) {
  const MODULO = 10 ** 9 + 7;
  let result = 0;
  let count = 0;

  for (let index = 0; index <= s.length; index++) {
    if (!index || s[index] === s[index - 1]) {
      count += 1;
      continue;
    }
    result += ((count + 1) * count) / 2;
    result %= MODULO;
    count = 1;
  }
  return result;
};
