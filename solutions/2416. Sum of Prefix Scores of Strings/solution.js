/**
 * @param {string[]} words
 * @return {number[]}
 */
const sumPrefixScores = function (words) {
  const trie = {};

  for (const word of words) {
    let node = trie;

    for (const letter of word) {
      if (!node[letter]) {
        node[letter] = { count: 0 };
      }
      node = node[letter];
      node.count += 1;
    }
  }

  return words.map(word => {
    let node = trie;
    let scores = 0;

    for (const letter of word) {
      node = node[letter];
      scores += node.count;
    }
    return scores;
  });
};
