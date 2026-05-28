/**
 * @param {string[]} wordsContainer
 * @param {string[]} wordsQuery
 * @return {number[]}
 */
const stringIndices = function (wordsContainer, wordsQuery) {
  const trie = new Map();
  const n = wordsContainer.length;
  let minEmptyIndex = 0;

  for (let index = 0; index < n; index++) {
    const word = wordsContainer[index];
    const len = word.length;
    let node = trie;

    for (let j = len - 1; j >= 0; j--) {
      const char = word[j];

      if (!node.has(char)) {
        node.set(char, new Map());
      }

      node = node.get(char);

      if (!node.has('len') || node.get('len') > len) {
        node.set('index', index);
        node.set('len', len);
      }
    }

    if (len < wordsContainer[minEmptyIndex].length) {
      minEmptyIndex = index;
    }
  }

  return wordsQuery.map(word => {
    let node = trie;

    for (let index = word.length - 1; index >= 0; index--) {
      const char = word[index];

      if (!node.has(char)) {
        return node.get('index') ?? minEmptyIndex;
      }

      node = node.get(char);
    }

    return node.get('index');
  });
};
