/**
 * @param {number[][]} intervals
 * @return {number}
 */
const intersectionSizeTwo = function (intervals) {
  let last1 = (last2 = -1);
  let result = 0;

  intervals.sort((a, b) => a[1] - b[1] || b[0] - a[0]);

  for (const [start, end] of intervals) {
    if (start <= last1) continue;
    if (start > last2) {
      last1 = end - 1;
      last2 = end;
      result += 2;
      continue;
    }
    last1 = last2;
    last2 = end;
    result += 1;
  }
  return result;
};
