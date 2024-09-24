/**
 * @param {string[]} words
 * @return {number[][]}
 */
const palindromePairs = function (words) {
  const wordMap = new Map();
  const wordSizeSet = new Set();
  const isPalindrome = (word, left, right) => {
    while (left < right) {
      if (word[left] !== word[right]) return false;
      left += 1;
      right -= 1;
    }
    return true;
  };
  const result = [];

  for (let index = 0; index < words.length; index++) {
    const word = words[index];

    wordMap.set(word, index);
    wordSizeSet.add(word.length);
  }
  for (let index = 0; index < words.length; index++) {
    const word = words[index];
    const size = word.length;
    const reverseWord = word.split('').reverse().join('');
    const reverseWordIndex = wordMap.get(reverseWord);

    if (reverseWordIndex !== undefined && reverseWordIndex !== index) {
      result.push([index, reverseWordIndex]);
    }
    for (let length = 0; length < size; length++) {
      if (!wordSizeSet.has(length)) continue;
      if (isPalindrome(reverseWord, 0, size - length - 1)) {
        const subWord = reverseWord.slice(size - length);

        if (wordMap.has(subWord)) {
          result.push([index, wordMap.get(subWord)]);
        }
      }
      if (isPalindrome(reverseWord, length, size - 1)) {
        const subWord = reverseWord.slice(0, length);

        if (wordMap.has(subWord)) {
          result.push([wordMap.get(subWord), index]);
        }
      }
    }
  }
  return result;
};
