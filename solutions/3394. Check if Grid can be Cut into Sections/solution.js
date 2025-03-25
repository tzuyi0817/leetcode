/**
 * @param {number} n
 * @param {number[][]} rectangles
 * @return {boolean}
 */
const checkValidCuts = function (n, rectangles) {
  const checkCut = direction => {
    const index = direction === 'vertical' ? 0 : 1;
    let intervals = 0;
    let lastEnd = 0;

    rectangles.sort((a, b) => a[index] - b[index]);

    for (const rectangle of rectangles) {
      const start = rectangle[index];
      const end = rectangle[index + 2];

      if (start >= lastEnd) {
        intervals += 1;
        lastEnd = end;
      } else {
        lastEnd = Math.max(end, lastEnd);
      }

      if (intervals >= 3) return true;
    }

    return false;
  };

  return checkCut('vertical') || checkCut('horizontal');
};
