/**
 * @param {number[][]} events
 * @param {number} k
 * @return {number}
 */
const maxValue = function (events, k) {
  const n = events.length;
  const nextEventMap = new Map();
  const dp = Array.from({ length: n }, () => new Array(k + 1).fill(-1));

  events.sort((a, b) => a[0] - b[0]);

  const findNextEvent = target => {
    let left = 0;
    let right = n - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const startDay = events[mid][0];

      startDay <= target ? (left = mid + 1) : (right = mid - 1);
    }

    return left;
  };

  for (let index = 0; index < n; index++) {
    const endDay = events[index][1];

    nextEventMap.set(index, findNextEvent(endDay));
  }

  const attendEvent = (index, remain) => {
    if (index >= n || !remain) return 0;
    if (dp[index][remain] !== -1) return dp[index][remain];
    const skip = attendEvent(index + 1, remain);
    const value = events[index][2];
    const nextEvent = nextEventMap.get(index);
    const attend = value + attendEvent(nextEvent, remain - 1);
    const result = Math.max(skip, attend);

    dp[index][remain] = result;

    return result;
  };

  return attendEvent(0, k);
};
