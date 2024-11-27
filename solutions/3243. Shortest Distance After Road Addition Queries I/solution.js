/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[]}
 */
const shortestDistanceAfterQueries = function (n, queries) {
  const graph = Array.from({ length: n }, () => []);
  const dp = Array.from({ length: n }, (_, index) => index);

  return queries.map(([from, to]) => {
    graph[to].push(from);

    for (let node = to; node < n; node++) {
      dp[node] = Math.min(dp[node], dp[node - 1] + 1);

      for (const fromNode of graph[node]) {
        dp[node] = Math.min(dp[node], dp[fromNode] + 1);
      }
    }
    return dp[n - 1];
  });
};
