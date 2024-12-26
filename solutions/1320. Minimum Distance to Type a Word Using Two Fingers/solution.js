/**
 * @param {string} word
 * @return {number}
 */
const minimumDistance = function (word) {
  const BASE_CODE = 'A'.charCodeAt(0);
  const COLS = 6;
  const n = word.length;
  const memo = new Map();

  const getCoordinate = letter => {
    const code = letter.charCodeAt(0) - BASE_CODE;
    const x = code % COLS;
    const y = Math.floor(code / 6);

    return { x, y };
  };

  const getDistance = (finger, target) => {
    if (!finger) return 0;
    const { x: fingerX, y: fingerY } = getCoordinate(finger);
    const { x: targetX, y: targetY } = getCoordinate(target);

    return Math.abs(fingerX - targetX) + Math.abs(fingerY - targetY);
  };

  const typeWord = (index, finger1, finger2) => {
    if (index >= n) return 0;
    const key = `${index},${finger1},${finger2}`;

    if (memo.has(key)) return memo.get(key);
    const letter = word[index];
    const distance1 = getDistance(finger1, letter);
    const distance2 = getDistance(finger2, letter);
    const total1 = distance1 + typeWord(index + 1, letter, finger2);
    const total2 = distance2 + typeWord(index + 1, finger1, letter);
    const result = Math.min(total1, total2);

    memo.set(key, result);

    return result;
  };

  return typeWord(0, null, null);
};
