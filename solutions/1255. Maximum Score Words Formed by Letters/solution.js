/**
 * @param {string[]} words
 * @param {character[]} letters
 * @param {number[]} score
 * @return {number}
 */
const maxScoreWords = function (words, letters, score) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const n = words.length;

  const getCode = letter => letter.charCodeAt(0) - BASE_CODE;

  const wordScores = words.map(word => {
    let result = 0;

    for (const letter of word) {
      result += score[getCode(letter)];
    }
    return result;
  });
  const letterCounts = Array.from({ length: 26 }, () => 0);

  for (const letter of letters) {
    letterCounts[getCode(letter)] += 1;
  }

  const useOrUnuseWord = (word, count) => {
    let isValid = true;

    for (const letter of word) {
      const code = getCode(letter);

      if (!letterCounts[code]) {
        isValid = false;
      }
      letterCounts[code] += count;
    }
    return isValid;
  };

  const getScore = start => {
    if (start >= n) return 0;
    let result = 0;

    for (let index = start; index < n; index++) {
      const word = words[index];
      const isValid = useOrUnuseWord(word, -1);

      if (isValid) {
        const nextScore = wordScores[index] + getScore(index + 1);

        result = Math.max(nextScore, result);
      }
      useOrUnuseWord(word, 1);
    }
    return result;
  };

  return getScore(0);
};
