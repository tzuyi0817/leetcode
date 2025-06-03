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
      const start = events[mid][0];

      start > target ? (right = mid - 1) : (left = mid + 1);
    }

    return left;
  };

  for (let index = 0; index < n; index++) {
    const end = events[index][1];
    const nextEvent = findNextEvent(end);

    nextEventMap.set(index, nextEvent);
  }

  const attendEvent = (index, quota) => {
    if (index >= n || quota === 0) return 0;
    if (dp[index][quota] !== -1) return dp[index][quota];
    const skipEventValue = attendEvent(index + 1, quota);
    const value = events[index][2];
    const nextEvent = nextEventMap.get(index);
    const nextEventValue = value + attendEvent(nextEvent, quota - 1);
    const result = Math.max(skipEventValue, nextEventValue);

    dp[index][quota] = result;

    return result;
  };

  return attendEvent(0, k);
};
