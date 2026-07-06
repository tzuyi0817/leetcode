/**
 * @param {number[][]} intervals
 * @return {number}
 */
const removeCoveredIntervals = function (intervals) {
  let currentEnd = 0;
  let result = 0;

  intervals.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

  for (const interval of intervals) {
    const end = interval[1];

    if (end > currentEnd) {
      currentEnd = end;
      result += 1;
    }
  }

  return result;
};
