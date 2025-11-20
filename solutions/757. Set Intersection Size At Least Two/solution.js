/**
 * @param {number[][]} intervals
 * @return {number}
 */
const intersectionSizeTwo = function (intervals) {
  let currentStart = -1;
  let currentEnd = -1;
  let result = 0;

  intervals.sort((a, b) => a[1] - b[1] || b[0] - a[0]);

  for (const [start, end] of intervals) {
    if (start > currentEnd) {
      currentStart = end - 1;
      currentEnd = end;
      result += 2;
    } else if (start > currentStart) {
      currentStart = currentEnd;
      currentEnd = end;
      result += 1;
    }
  }

  return result;
};
