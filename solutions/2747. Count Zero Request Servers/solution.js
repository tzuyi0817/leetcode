/**
 * @param {number} n
 * @param {number[][]} logs
 * @param {number} x
 * @param {number[]} queries
 * @return {number[]}
 */
const countServers = function (n, logs, x, queries) {
  const m = logs.length;
  const serverMap = new Map();
  const sortedQueries = queries.map((time, index) => ({ time, index })).toSorted((a, b) => a.time - b.time);
  const result = [];
  let left = 0;
  let right = 0;

  logs.sort((a, b) => a[1] - b[1]);

  for (const { time, index } of sortedQueries) {
    while (right < m && logs[right][1] <= time) {
      const id = logs[right][0];
      const count = serverMap.get(id) ?? 0;

      serverMap.set(id, count + 1);
      right += 1;
    }

    const intervalStart = time - x;

    if (intervalStart > 0) {
      while (left < m && logs[left][1] < intervalStart) {
        const id = logs[left][0];
        const count = serverMap.get(id);

        if (count === 1) {
          serverMap.delete(id);
        } else {
          serverMap.set(id, count - 1);
        }

        left += 1;
      }
    }

    result[index] = n - serverMap.size;
  }

  return result;
};
