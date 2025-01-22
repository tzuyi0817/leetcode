/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} t
 * @param {number} target
 * @return {number}
 */
const frogPosition = function (n, edges, t, target) {
  const probabilities = Array.from({ length: n + 1 }, () => 0);
  const visited = Array.from({ length: n + 1 }, () => false);
  const graph = new Map();

  for (const [a, b] of edges) {
    if (!graph.has(a)) graph.set(a, []);
    if (!graph.has(b)) graph.set(b, []);

    graph.get(a).push(b);
    graph.get(b).push(a);
  }

  const jumpToVertex = (vertex, probability, seconds) => {
    if (seconds === t) {
      probabilities[vertex] += probability;
      return;
    }
    visited[vertex] = true;

    let nextVertices = graph.get(vertex) ?? [];

    nextVertices = nextVertices.filter(node => !visited[node]);

    if (!nextVertices.length) {
      probabilities[vertex] += probability;
      return;
    }
    const nextProbability = probability * (1 / nextVertices.length);

    for (const nextVertex of nextVertices) {
      jumpToVertex(nextVertex, nextProbability, seconds + 1);
    }
    visited[vertex] = false;
  };

  jumpToVertex(1, 1, 0);

  return probabilities[target];
};
