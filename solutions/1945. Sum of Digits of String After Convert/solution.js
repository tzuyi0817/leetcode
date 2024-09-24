/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const getLucky = function (s, k) {
  const BASE_CODE = 'a'.charCodeAt(0);
  let result = '';

  for (const letter of s) {
    const code = letter.charCodeAt(0) - BASE_CODE + 1;

    result += code;
  }

  for (let index = 0; index < k; index++) {
    const str = `${result}`;
    let current = 0;

    for (const num of str) {
      current += +num;
    }
    result = current;
  }
  return result;
};
