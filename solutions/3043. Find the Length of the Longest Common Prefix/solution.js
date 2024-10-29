/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number}
 */
const longestCommonPrefix = function (arr1, arr2) {
  const trie = new Map();

  for (const num of arr1) {
    let node = trie;

    for (const char of `${num}`) {
      if (!node.has(char)) {
        node.set(char, new Map());
      }
      node = node.get(char);
    }
  }
  let result = 0;

  for (const num of arr2) {
    const str = `${num}`;
    let node = trie;

    for (const [index, char] of str.entries()) {
      if (!node.has(char)) break;
      node = node.get(char);
      result = Math.max(index + 1, result);
    }
  }
  return result;
};
