/**
 * @param {string[]} words
 * @param {string} result
 * @return {boolean}
 */
const isSolvable = function (words, result) {
  const allWords = [...words, result];
  const m = allWords.length;
  const decodeMap = new Map();
  let n = 0;

  for (const word of allWords) {
    n = Math.max(word.length, n);
  }

  const solveEquation = (row, col, sum, digitMask) => {
    if (col === n) return sum === 0;
    if (row === m) {
      const isEqual = sum % 10 === 0;
      const carry = Math.floor(sum / 10);

      return isEqual && solveEquation(0, col + 1, carry, digitMask);
    }
    const word = allWords[row];

    if (col >= word.length) {
      return solveEquation(row + 1, col, sum, digitMask);
    }
    const letter = word[word.length - 1 - col];
    const sign = row === m - 1 ? -1 : 1;
    const isLeading = word.length > 1 && col === word.length - 1;

    if (decodeMap.has(letter)) {
      const digit = decodeMap.get(letter);

      if (isLeading && digit === 0) return false;
      const nextSum = digit * sign + sum;

      return solveEquation(row + 1, col, nextSum, digitMask);
    }
    const startDigit = isLeading ? 1 : 0;

    for (let digit = startDigit; digit < 10; digit++) {
      const mask = 1 << digit;

      if (digitMask & mask) continue;
      const nextSum = digit * sign + sum;

      decodeMap.set(letter, digit);
      if (solveEquation(row + 1, col, nextSum, digitMask | mask)) return true;

      decodeMap.delete(letter);
    }
    return false;
  };

  return solveEquation(0, 0, 0, 0);
};
