/**
 * @param {number[]} scores
 * @param {number[][]} edges
 * @return {number}
 */
const maximumScore = function (scores, edges) {
  const n = scores.length;
  const graph = Array.from({ length: n }, () => []);
  let result = -1;

  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }

  for (let node = 0; node < n; node++) {
    const neighbors = graph[node];

    neighbors.sort((a, b) => scores[b] - scores[a]);
    graph[node] = neighbors.slice(0, 3);
  }

  for (const [a, b] of edges) {
    for (const c of graph[a]) {
      if (a === c || b === c) continue;

      for (const d of graph[b]) {
        if (d === c || d === a || d === b) continue;

        const sum = scores[a] + scores[b] + scores[c] + scores[d];

        result = Math.max(sum, result);
      }
    }
  }

  return result;
};
