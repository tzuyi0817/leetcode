/**
 * @param {string[]} queries
 * @param {string[]} dictionary
 * @return {string[]}
 */
const twoEditWords = function (queries, dictionary) {
  const result = [];

  const isValidWord = target => {
    const n = target.length;

    for (const word of dictionary) {
      let diff = 0;

      for (let index = 0; index < n; index++) {
        if (word[index] !== target[index]) {
          diff += 1;
        }

        if (diff > 2) break;
      }

      if (diff <= 2) return true;
    }

    return false;
  };

  for (const word of queries) {
    if (isValidWord(word)) {
      result.push(word);
    }
  }

  return result;
};
