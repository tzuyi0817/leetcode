/**
 * @param {string} sentence
 * @return {number}
 */
const countValidWords = function (sentence) {
  const words = sentence.split(' ');
  const regex = /^[a-z]+(-[a-z]+)?[!.,]?$/;
  const regexMarks = /^[!.,]$/;

  return words.reduce((result, word) => {
    const isValid = regex.test(word) || regexMarks.test(word);

    return isValid ? result + 1 : result;
  }, 0);
};
