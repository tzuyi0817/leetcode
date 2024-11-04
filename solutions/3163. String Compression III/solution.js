/**
 * @param {string} word
 * @return {string}
 */
const compressedString = function (word) {
  const n = word.length;
  let repeat = 1;
  let result = '';

  for (let index = 1; index <= n; index++) {
    if (word[index] === word[index - 1] && repeat < 9) {
      repeat += 1;
      continue;
    }
    result += `${repeat}${word[index - 1]}`;
    repeat = 1;
  }
  return result;
};
