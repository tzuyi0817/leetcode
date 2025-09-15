/**
 * @param {string} text
 * @param {string} brokenLetters
 * @return {number}
 */
const canBeTypedWords = function (text, brokenLetters) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const words = text.split(' ');
  const letters = Array.from({ length: 26 }, () => true);
  let result = 0;

  for (const char of brokenLetters) {
    const code = char.charCodeAt(0) - BASE_CODE;

    letters[code] = false;
  }

  const isValidWord = word => {
    for (const char of word) {
      const code = char.charCodeAt(0) - BASE_CODE;

      if (!letters[code]) return false;
    }

    return true;
  };

  for (const word of words) {
    if (isValidWord(word)) {
      result += 1;
    }
  }

  return result;
};
