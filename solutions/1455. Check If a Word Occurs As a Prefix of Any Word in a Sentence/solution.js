/**
 * @param {string} sentence
 * @param {string} searchWord
 * @return {number}
 */
const isPrefixOfWord = function (sentence, searchWord) {
  const words = sentence.split(' ');
  const index = words.findIndex(word => word.startsWith(searchWord));

  return index === -1 ? -1 : index + 1;
};
