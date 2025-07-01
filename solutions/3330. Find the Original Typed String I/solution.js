/**
 * @param {string} word
 * @return {number}
 */
const possibleStringCount = function (word) {
  const n = word.length;
  let result = 1;

  for (let index = 1; index < n; index++) {
    if (word[index] === word[index - 1]) {
      result += 1;
    }
  }

  return result;
};
