/**
 * @param {number} days
 * @param {number[][]} meetings
 * @return {number}
 */
const countDays = function (days, meetings) {
  let lastEnd = 0;
  let result = 0;

  meetings.sort((a, b) => a[0] - b[0]);

  for (const [start, end] of meetings) {
    if (start > lastEnd) {
      result += start - lastEnd - 1;
      lastEnd = end;
    } else {
      lastEnd = Math.max(end, lastEnd);
    }
  }

  return result + days - lastEnd;
};
