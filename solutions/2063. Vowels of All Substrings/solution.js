/**
 * @param {string} word
 * @return {number}
 */
const countVowels = function (word) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  let dp = (result = 0);

  for (let index = 0; index < word.length; index++) {
    if (vowels.includes(word[index])) {
      dp += index + 1;
    }
    result += dp;
  }
  return result;
};
