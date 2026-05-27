/**
 * @param {string} word
 * @return {number}
 */
const numberOfSpecialChars = function (word) {
  const n = word.length;
  const LOWER_CODE_A = 'a'.charCodeAt(0);
  const UPPER_CODE_A = 'A'.charCodeAt(0);
  const uppercaseFirst = Array.from({ length: 26 }, () => -1);
  const lowercaseLast = Array.from({ length: 26 }, () => -1);
  let result = 0;

  for (let index = 0; index < n; index++) {
    const char = word[index];

    if (/[a-z]/.test(char)) {
      const code = char.charCodeAt(0) - LOWER_CODE_A;

      lowercaseLast[code] = index;
    } else {
      const code = char.charCodeAt(0) - UPPER_CODE_A;

      if (uppercaseFirst[code] === -1) {
        uppercaseFirst[code] = index;
      }
    }
  }

  for (let code = 0; code < 26; code++) {
    if (lowercaseLast[code] === -1) continue;

    if (lowercaseLast[code] < uppercaseFirst[code]) {
      result += 1;
    }
  }

  return result;
};
