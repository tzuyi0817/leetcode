/**
 * @param {string} s
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
const maximumGain = function (s, x, y) {
  const getScore = (type, pointX, pointY) => {
    const [firstChar, secondChar] = type;
    let result = 0;
    let firstCount = 0;
    let secondCount = 0;

    for (const char of s) {
      if (char === firstChar) firstCount += 1;
      else if (char === secondChar) {
        if (firstCount) {
          firstCount -= 1;
          result += pointX;
          continue;
        }
        secondCount += 1;
      } else {
        result += Math.min(firstCount, secondCount) * pointY;
        firstCount = secondCount = 0;
      }
    }
    return result + Math.min(firstCount, secondCount) * pointY;
  };

  return Math.max(getScore('ab', x, y), getScore('ba', y, x));
};
