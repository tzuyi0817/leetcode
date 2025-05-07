/**
 * @param {number[][]} events
 * @return {number}
 */
const maxTwoEvents = function (events) {
  const endEventMap = events.reduce((map, [_, end, value]) => {
    const previousValue = map.get(end);

    if (previousValue >= value) return map;
    return map.set(end, value);
  }, new Map());
  const endEvents = [...endEventMap.keys()];
  let previousValue = 0;
  let result = 0;
  let currentEnd = 0;

  events.sort((a, b) => a[0] - b[0]);
  endEvents.sort((a, b) => a - b);

  for (const event of events) {
    const start = event[0];
    const value = event[2];

    while (endEvents[currentEnd] < start) {
      const endValue = endEventMap.get(endEvents[currentEnd]);

      previousValue = Math.max(endValue, previousValue);
      currentEnd += 1;
    }
    result = Math.max(previousValue + value, result);
  }
  return result;
};
