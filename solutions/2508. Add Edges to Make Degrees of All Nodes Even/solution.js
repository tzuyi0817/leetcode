/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
const isPossible = function (n, edges) {
  const graph = Array.from({ length: n }, () => []);
  const oddNodes = [];

  for (const [u, v] of edges) {
    const a = u - 1;
    const b = v - 1;

    graph[a].push(b);
    graph[b].push(a);
  }

  for (let node = 0; node < n; node++) {
    if (graph[node].length % 2) {
      oddNodes.push(node);
    }
  }

  if (oddNodes.length === 0) return true;

  if (oddNodes.length === 2) {
    const [a, b] = oddNodes;

    if (!graph[a].includes(b)) return true;

    for (let node = 0; node < n; node++) {
      if (node === a || node === b) continue;

      if (!graph[node].includes(a) && !graph[node].includes(b)) {
        return true;
      }
    }
  }

  if (oddNodes.length === 4) {
    const [a, b, c, d] = oddNodes;

    if (!graph[a].includes(b) && !graph[c].includes(d)) return true;
    if (!graph[a].includes(c) && !graph[b].includes(d)) return true;
    if (!graph[a].includes(d) && !graph[b].includes(c)) return true;
  }

  return false;
};
