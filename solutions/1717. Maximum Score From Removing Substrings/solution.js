/**
 * @param {string} s
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
const maximumGain = function (s, x, y) {
  const getScore = (sub, subPoint, otherPoint) => {
    const [first, second] = sub;
    let firstCount = 0;
    let secondCount = 0;
    let result = 0;

    for (const char of s) {
      if (char === first) {
        firstCount += 1;
      } else if (firstCount && char === second) {
        firstCount -= 1;
        result += subPoint;
      } else if (char === second) {
        secondCount += 1;
      } else {
        result += Math.min(firstCount, secondCount) * otherPoint;
        firstCount = 0;
        secondCount = 0;
      }
    }

    return result + Math.min(firstCount, secondCount) * otherPoint;
  };

  return x > y ? getScore('ab', x, y) : getScore('ba', y, x);
};
