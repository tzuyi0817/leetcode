/**
 * @param {number[]} values
 * @param {number[][]} edges
 * @param {number} maxTime
 * @return {number}
 */
const maximalPathQuality = function (values, edges, maxTime) {
  const n = values.length;
  const graph = Array.from({ length: n + 1 }, () => []);
  const visited = Array.from({ length: n + 1 }, () => 0);
  let result = 0;

  for (const [u, v, time] of edges) {
    graph[u].push({ node: v, time });
    graph[v].push({ node: u, time });
  }

  visited[0] = 1;

  const dfsGraph = (node, value, time) => {
    if (node === 0) {
      result = Math.max(value, result);
    }

    for (const neighbor of graph[node]) {
      const nextTime = time + neighbor.time;

      if (nextTime > maxTime) continue;

      let nextValue = value;

      if (!visited[neighbor.node]) {
        nextValue += values[neighbor.node];
      }

      visited[neighbor.node] += 1;
      dfsGraph(neighbor.node, nextValue, nextTime);
      visited[neighbor.node] -= 1;
    }
  };

  dfsGraph(0, values[0], 0);

  return result;
};
