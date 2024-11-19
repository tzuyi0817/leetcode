/**
 * @param {string[]} words
 * @param {string[]} puzzles
 * @return {number[]}
 */
const findNumOfValidWords = function (words, puzzles) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const maskMap = new Map();

  const getCode = letter => letter.charCodeAt(0) - BASE_CODE;

  for (const word of words) {
    let mask = 0;

    for (const letter of word) {
      mask |= 1 << getCode(letter);
    }
    maskMap.set(mask, (maskMap.get(mask) ?? 0) + 1);
  }

  return puzzles.map(puzzle => {
    let puzzleMask = 0;

    for (const letter of puzzle) {
      puzzleMask |= 1 << getCode(letter);
    }
    const firstMask = 1 << getCode(puzzle[0]);
    let subMask = puzzleMask;
    let result = 0;

    while (subMask) {
      if ((subMask & firstMask) === firstMask) {
        result += maskMap.get(subMask) ?? 0;
      }
      subMask = (subMask - 1) & puzzleMask;
    }
    return result;
  });
};
