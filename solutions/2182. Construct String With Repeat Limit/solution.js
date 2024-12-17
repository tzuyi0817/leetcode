/**
 * @param {string} s
 * @param {number} repeatLimit
 * @return {string}
 */
const repeatLimitedString = function (s, repeatLimit) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const n = s.length;
  const letters = Array.from({ length: 26 }, () => 0);
  const result = [];
  let repeat = 1;

  const getCode = letter => letter.charCodeAt(0) - BASE_CODE;
  const getLargestCode = previousCode => {
    for (let code = 25; code >= 0; code--) {
      const count = letters[code];

      if (!count) continue;
      repeat = code === previousCode ? repeat + 1 : 1;

      if (repeat > repeatLimit) continue;
      return code;
    }
    return -1;
  };

  for (const letter of s) {
    letters[getCode(letter)] += 1;
  }

  for (let index = 0; index < n; index++) {
    const code = getLargestCode(result[index - 1]);

    if (code < 0) break;
    letters[code] -= 1;
    result.push(code);
  }

  return result.reduce((word, code) => {
    return `${word}${String.fromCharCode(code + BASE_CODE)}`;
  }, '');
};
