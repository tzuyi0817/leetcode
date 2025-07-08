/**
 * @param {number[][]} intervals
 * @param {number[]} queries
 * @return {number[]}
 */
const minInterval = function (intervals, queries) {
  const m = intervals.length;
  const n = queries.length;
  const minHeap = new MinPriorityQueue(({ left, right }) => right - left + 1);
  const indexedQueries = queries.map((query, index) => ({ query, index }));
  const result = Array.from({ length: n }, () => -1);
  let intervalIndex = 0;

  intervals.sort((a, b) => a[0] - b[0]);
  indexedQueries.sort((a, b) => a.query - b.query);

  for (const { query, index } of indexedQueries) {
    while (intervalIndex < m && intervals[intervalIndex][0] <= query) {
      const [left, right] = intervals[intervalIndex];

      minHeap.enqueue({ left, right });
      intervalIndex += 1;
    }

    while (minHeap.size() && minHeap.front().right < query) {
      minHeap.dequeue();
    }

    if (!minHeap.size()) continue;
    const { left, right } = minHeap.front();

    result[index] = right - left + 1;
  }

  return result;
};
