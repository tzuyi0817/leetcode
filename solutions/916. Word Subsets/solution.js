/**
 * @param {string[]} words1
 * @param {string[]} words2
 * @return {string[]}
 */
const wordSubsets = function (words1, words2) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const subset = Array.from({ length: 26 }, () => 0);

  const calculateSubset = word => {
    const result = Array.from({ length: 26 }, () => 0);

    for (const letter of word) {
      const code = letter.charCodeAt(0) - BASE_CODE;

      result[code] += 1;
    }
    return result;
  };

  for (const word of words2) {
    const currentSubset = calculateSubset(word);

    for (let code = 0; code < 26; code++) {
      subset[code] = Math.max(currentSubset[code], subset[code]);
    }
  }

  const result = [];

  const isUniversal = currentSubset => {
    for (let code = 0; code < 26; code++) {
      if (currentSubset[code] < subset[code]) return false;
    }
    return true;
  };

  for (const word of words1) {
    const currentSubset = calculateSubset(word);

    if (isUniversal(currentSubset)) {
      result.push(word);
    }
  }
  return result;
};
