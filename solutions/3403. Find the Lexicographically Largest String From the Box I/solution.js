/**
 * @param {string} word
 * @param {number} numFriends
 * @return {string}
 */
const answerString = function (word, numFriends) {
  if (numFriends === 1) return word;
  const n = word.length;
  let result = '';

  for (let index = 0; index < n; index++) {
    if (result[0] > word[index]) continue;
    const needSplit = Math.max(numFriends - index - 1, 0);
    const splitWord = word.slice(index, n - needSplit);

    if (splitWord > result) {
      result = splitWord;
    }
  }

  return result;
};
