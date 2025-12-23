/**
 * @param {number[][]} events
 * @return {number}
 */
const maxTwoEvents = function (events) {
  const n = events.length;
  const endEvents = [];

  for (const event of events) {
    const end = event[1];
    const value = event[2];

    endEvents.push({ end, value });
  }

  events.sort((a, b) => a[0] - b[0]);
  endEvents.sort((a, b) => a.end - b.end);

  let end = 0;
  let maxValue = 0;
  let result = 0;

  for (const event of events) {
    const start = event[0];
    const value = event[2];

    while (end < n && endEvents[end].end < start) {
      maxValue = Math.max(endEvents[end].value, maxValue);
      end += 1;
    }

    result = Math.max(maxValue + value, result);
  }

  return result;
};
