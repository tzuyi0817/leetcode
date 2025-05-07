/**
 * @param {string} s
 * @return {number}
 */
const minInsertions = function (s) {
  let left = 0;
  let index = 0;
  let result = 0;

  while (index < s.length) {
    if (s[index] === '(') left += 1;
    else if (s[index + 1] === ')') {
      left ? (left -= 1) : (result += 1);
      index += 1;
    } else if (left) {
      left -= 1;
      result += 1;
    } else result += 2;

    index += 1;
  }
  return result + left * 2;
};
