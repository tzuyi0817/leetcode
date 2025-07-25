/**
 * @param {number} maxTime
 * @param {number[][]} edges
 * @param {number[]} passingFees
 * @return {number}
 */
const minCost = function (maxTime, edges, passingFees) {
  const n = passingFees.length;
  const graph = Array.from({ length: n }, () => []);
  const minHeap = new MinPriorityQueue(({ cost }) => cost);
  const dp = Array.from({ length: n }, () => Number.MAX_SAFE_INTEGER);

  for (const [x, y, time] of edges) {
    graph[x].push({ city: y, time });
    graph[y].push({ city: x, time });
  }

  dp[0][0] = passingFees[0];
  minHeap.enqueue({ city: 0, time: 0, cost: passingFees[0] });

  while (minHeap.size()) {
    const { city, time, cost } = minHeap.dequeue();

    if (city === n - 1) return cost;

    for (const neighbor of graph[city]) {
      const totalTime = time + neighbor.time;
      const totalCost = cost + passingFees[neighbor.city];

      if (totalTime > maxTime || totalTime >= dp[neighbor.city]) continue;

      dp[neighbor.city] = totalTime;
      minHeap.enqueue({ city: neighbor.city, time: totalTime, cost: totalCost });
    }
  }

  return -1;
};
