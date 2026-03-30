/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
const checkStrings = function (s1, s2) {
  const n = s1.length;
  const BASE_CODE = 'a'.charCodeAt(0);
  const oddChars = Array.from({ length: 26 }, () => 0);
  const evenChars = Array.from({ length: 26 }, () => 0);

  for (let index = 0; index < n; index++) {
    const code1 = s1[index].charCodeAt(0) - BASE_CODE;
    const code2 = s2[index].charCodeAt(0) - BASE_CODE;

    if (index % 2) {
      oddChars[code1] += 1;
      oddChars[code2] -= 1;
    } else {
      evenChars[code1] += 1;
      evenChars[code2] -= 1;
    }
  }

  for (let code = 0; code < 26; code++) {
    if (oddChars[code] !== 0 || evenChars[code] !== 0) {
      return false;
    }
  }

  return true;
};
