/**
 * @param {number[]} nums
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
const countPairs = function (nums, low, high) {
  const trie = new TrieNode();
  const maxNum = Math.max(...nums, high);
  const log = Math.ceil(Math.log2(maxNum));
  let result = 0;

  const insertNum = num => {
    let current = trie;

    for (let index = log; index >= 0; index--) {
      const bit = (num >> index) & 1;

      if (!current.children[bit]) {
        current.children[bit] = new TrieNode();
      }

      current = current.children[bit];
      current.count += 1;
    }
  };

  const getCount = (num, limit) => {
    let count = 0;
    let current = trie;

    for (let index = log; index >= 0; index--) {
      const bit = (num >> index) & 1;
      const limitBit = (limit >> index) & 1;

      if (limitBit) {
        if (current.children[bit]) {
          count += current.children[bit].count;
        }

        current = current.children[bit ^ 1];
      } else {
        current = current.children[bit];
      }

      if (!current) return count;
    }

    return count;
  };

  for (const num of nums) {
    result += getCount(num, high + 1) - getCount(num, low);
    insertNum(num);
  }

  return result;
};

class TrieNode {
  children = [null, null];
  count = 0;
}
