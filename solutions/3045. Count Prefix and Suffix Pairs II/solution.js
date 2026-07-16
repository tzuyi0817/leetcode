/**
 * @param {string[]} words
 * @return {number}
 */
const countPrefixSuffixPairs = function (words) {
  const trie = new Trie();
  let result = 0;

  for (const word of words) {
    result += trie.insert(word);
  }

  return result;
};

class TrieNode {
  constructor() {
    this.children = new Map();
    this.count = 0;
  }
}

class Trie {
  #BASE_CODE = 'a'.charCodeAt(0);

  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    const n = word.length;
    let count = 0;
    let node = this.root;

    for (let index = 0; index < n; index++) {
      const prefix = word[index].charCodeAt(0) - this.#BASE_CODE;
      const suffix = word[n - index - 1].charCodeAt(0) - this.#BASE_CODE;
      const hash = prefix * 26 + suffix;

      if (!node.children.has(hash)) {
        node.children.set(hash, new TrieNode());
      }

      node = node.children.get(hash);
      count += node.count;
    }

    node.count += 1;

    return count;
  }
}
