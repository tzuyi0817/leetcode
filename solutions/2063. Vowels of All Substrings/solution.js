/**
 * @param {string} word
 * @return {number}
 */
const countVowels = function (word) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  let dp = 0;
  let result = 0;

  for (const [index, element] of word.entries()) {
    if (vowels.includes(element)) {
      dp += index + 1;
    }
    result += dp;
  }
  return result;
};
