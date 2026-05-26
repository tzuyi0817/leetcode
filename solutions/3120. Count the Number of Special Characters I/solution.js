/**
 * @param {string} word
 * @return {number}
 */
const numberOfSpecialChars = function (word) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const charSet = new Set(word);
  let mask = 0;
  let result = 0;

  for (const char of charSet) {
    const code = char.toLowerCase().charCodeAt(0) - BASE_CODE;

    if ((mask >> code) & 1) {
      result += 1;
    }

    mask |= 1 << code;
  }

  return result;
};
