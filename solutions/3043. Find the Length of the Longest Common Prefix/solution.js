/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number}
 */
const longestCommonPrefix = function (arr1, arr2) {
  const trie = new Map();
  let result = 0;

  for (const num of arr1) {
    let current = trie;

    for (const char of `${num}`) {
      if (!current.has(char)) {
        current.set(char, new Map());
      }

      current = current.get(char);
    }
  }

  const getCommonPrefixLen = target => {
    const n = target.length;
    let current = trie;

    for (let index = 0; index < n; index++) {
      const char = target[index];

      if (!current.has(char)) {
        return index;
      }

      current = current.get(char);
    }

    return n;
  };

  for (const num of arr2) {
    const len = getCommonPrefixLen(`${num}`);

    result = Math.max(len, result);
  }

  return result;
};
