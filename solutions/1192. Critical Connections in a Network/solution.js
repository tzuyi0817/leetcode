/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number[][]}
 */
const criticalConnections = function (n, connections) {
  const network = Array.from({ length: n }, () => []);

  for (const [a, b] of connections) {
    network[a].push(b);
    network[b].push(a);
  }
  const times = Array.from({ length: n }, () => 0);
  const low = Array.from({ length: n }, () => 0);
  const result = [];
  let time = 1;

  const biconnectedComponent = (node, parent) => {
    times[node] = time;
    low[node] = time;
    time += 1;

    for (const next of network[node]) {
      if (!times[next]) {
        biconnectedComponent(next, node);
        low[node] = Math.min(low[node], low[next]);
      } else if (next !== parent) {
        low[node] = Math.min(low[node], times[next]);
      }

      if (low[next] > times[node]) {
        result.push([node, next]);
      }
    }
  };

  biconnectedComponent(0, -1);

  return result;
};
