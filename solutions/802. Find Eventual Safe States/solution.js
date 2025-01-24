/**
 * @param {number[][]} graph
 * @return {number[]}
 */
const eventualSafeNodes = function (graph) {
  const n = graph.length;
  const SAFE = 0;
  const CYCLE = 1;
  const visited = Array.from({ length: n }, () => false);
  const states = Array.from({ length: n }, () => -1);
  const result = [];

  const isSafeNode = node => {
    if (visited[node]) return false;
    if (states[node] !== -1) return states[node] === SAFE;

    visited[node] = true;

    for (const neighbor of graph[node]) {
      states[neighbor] = isSafeNode(neighbor) ? SAFE : CYCLE;

      if (states[neighbor] === CYCLE) return false;
    }
    visited[node] = false;
    states[node] = SAFE;

    return true;
  };

  for (let node = 0; node < n; node++) {
    if (isSafeNode(node)) result.push(node);
  }
  return result;
};
