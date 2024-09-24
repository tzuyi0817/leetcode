/**
 * @param {string[]} dictionary
 * @param {string} sentence
 * @return {string}
 */
const replaceWords = function (dictionary, sentence) {
  const trie = new Map();
  const words = sentence.split(' ');

  for (const word of dictionary) {
    let current = trie;

    for (const char of word) {
      if (!current.has(char)) {
        current.set(char, new Map());
      }
      current = current.get(char);
    }
    current.set('isWord', true);
  }
  for (let index = 0; index < words.length; index++) {
    let current = trie;
    let root = '';

    for (const char of words[index]) {
      if (current.has('isWord')) {
        words[index] = root;
        break;
      }
      if (!current.has(char)) break;
      current = current.get(char);
      root += char;
    }
  }
  return words.join(' ');
};
