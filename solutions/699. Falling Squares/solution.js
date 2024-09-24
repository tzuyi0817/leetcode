/**
 * @param {number[][]} positions
 * @return {number[]}
 */
const fallingSquares = function (positions) {
  const intervals = [];
  const result = [];
  let currentMaxHeight = 0;

  const getHeight = interval => {
    let prevHeight = 0;

    for (const { left, right, height } of intervals) {
      if (interval.left >= right) continue;
      if (interval.right <= left) continue;
      prevHeight = Math.max(height, prevHeight);
    }
    interval.height += prevHeight;
    return interval.height;
  };

  for (const [left, sideLength] of positions) {
    const interval = { left, right: left + sideLength, height: sideLength };

    currentMaxHeight = Math.max(getHeight(interval), currentMaxHeight);
    intervals.push(interval);
    result.push(currentMaxHeight);
  }
  return result;
};
