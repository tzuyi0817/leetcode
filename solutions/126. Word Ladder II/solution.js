/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
const findLadders = function (beginWord, endWord, wordList) {
  const BASE_CHAR_CODE = 'a'.charCodeAt(0);
  const wordSet = new Set(wordList);

  if (!wordSet.has(endWord)) return [];
  const sequences = [];
  let queue = [beginWord];
  let reached = false;

  wordSet.delete(beginWord);

  while (queue.length && !reached) {
    const nextQueue = [];

    sequences.push(queue);
    for (const word of queue) {
      for (let index = 0; index < word.length; index++) {
        for (let code = BASE_CHAR_CODE; code < BASE_CHAR_CODE + 26; code++) {
          const letter = String.fromCharCode(code);
          const nextWord = `${word.slice(0, index)}${letter}${word.slice(index + 1)}`;

          if (!wordSet.has(nextWord)) continue;
          if (nextWord === endWord) {
            reached = true;
            break;
          }
          nextQueue.push(nextWord);
          wordSet.delete(nextWord);
        }
        if (reached) break;
      }
    }
    queue = nextQueue;
  }
  if (!reached) return [];

  const result = [[endWord]];
  const isValid = (a, b) => {
    let diff = 0;

    for (const [index, element] of a.entries()) {
      if (element !== b[index]) diff += 1;
      if (diff > 1) return false;
    }
    return diff === 1;
  };

  for (let step = sequences.length - 1; step >= 0; step--) {
    const size = result.length;

    for (let index = 0; index < size; index++) {
      const path = result.shift();
      const nextWord = path[0];

      for (const word of sequences[step]) {
        if (!isValid(word, nextWord)) continue;
        result.push([word, ...path]);
      }
    }
  }
  return result;
};
