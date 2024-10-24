/**
 * @param {string[]} words
 */
const StreamChecker = function (words) {
  const trie = {};

  for (const word of words) {
    const n = word.length;
    let current = trie;

    for (let index = n - 1; index >= 0; index--) {
      const letter = word[index];

      if (!current[letter]) {
        current[letter] = {};
      }
      current = current[letter];
    }
    current.isWord = true;
  }

  this.trie = trie;
  this.stream = [];
};

/**
 * @param {character} letter
 * @return {boolean}
 */
StreamChecker.prototype.query = function (letter) {
  this.stream.push(letter);

  const n = this.stream.length;
  let current = this.trie;

  for (let index = n - 1; index >= 0; index--) {
    const char = this.stream[index];

    if (!current[char]) return false;

    current = current[char];
    if (current.isWord) return true;
  }
  return false;
};

/**
 * Your StreamChecker object will be instantiated and called as such:
 * var obj = new StreamChecker(words)
 * var param_1 = obj.query(letter)
 */
