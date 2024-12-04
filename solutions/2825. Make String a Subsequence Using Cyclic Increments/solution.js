/**
 * @param {string} str1
 * @param {string} str2
 * @return {boolean}
 */
const canMakeSubsequence = function (str1, str2) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const n = str2.length;
  let index = 0;

  const isValid = (letter, target) => {
    const nextCode = (letter.charCodeAt(0) - BASE_CODE + 1) % 26;
    const targetCode = target.charCodeAt(0) - BASE_CODE;

    return nextCode === targetCode;
  };

  for (const letter of str1) {
    const target = str2[index];

    if (letter === target || isValid(letter, target)) {
      index += 1;
    }
    if (index === n) return true;
  }
  return false;
};
