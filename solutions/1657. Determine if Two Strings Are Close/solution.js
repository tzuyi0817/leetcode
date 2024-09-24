/**
 * @param {string} word1
 * @param {string} word2
 * @return {boolean}
 */
const closeStrings = function (word1, word2) {
  if (word1.length !== word2.length) return false;
  const CODE_BASE = 'a'.charCodeAt(0);
  const word1Count = Array(26).fill(0);
  const word2Count = Array(26).fill(0);

  for (let index = 0; index < word1.length; index++) {
    const charCode1 = word1.charCodeAt(index);
    const charCode2 = word2.charCodeAt(index);

    word1Count[charCode1 - CODE_BASE] += 1;
    word2Count[charCode2 - CODE_BASE] += 1;
  }
  for (let index = 0; index < 26; index++) {
    if (word1Count[index] && !word2Count[index]) return false;
    if (word2Count[index] && !word1Count[index]) return false;
  }

  word1Count.sort((a, b) => b - a);
  word2Count.sort((a, b) => b - a);

  for (let index = 0; index < 26; index++) {
    if (word1Count[index] !== word2Count[index]) return false;
  }
  return true;
};
