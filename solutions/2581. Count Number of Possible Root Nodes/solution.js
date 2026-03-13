/**
 * @param {number[][]} edges
 * @param {number[][]} guesses
 * @param {number} k
 * @return {number}
 */
const rootCount = function (edges, guesses, k) {
  const n = edges.length + 1;
  const graph = Array.from({ length: n }, () => []);
  const guessGraph = Array.from({ length: n }, () => new Set());
  let correctGuess = 0;
  let result = 0;

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  for (const [u, v] of guesses) {
    guessGraph[u].add(v);
  }

  const dfs = (node, prev) => {
    if (prev > -1 && guessGraph[prev].has(node)) {
      correctGuess += 1;
    }

    for (const neighbor of graph[node]) {
      if (neighbor === prev) continue;

      dfs(neighbor, node);
    }
  };

  dfs(0, -1);

  const reroot = (node, prev) => {
    if (correctGuess >= k) {
      result += 1;
    }

    for (const neighbor of graph[node]) {
      if (neighbor === prev) continue;

      const isParent = guessGraph[neighbor].has(node);
      const isChild = guessGraph[node].has(neighbor);

      if (isParent) {
        correctGuess += 1;
      }

      if (isChild) {
        correctGuess -= 1;
      }

      reroot(neighbor, node);

      if (isParent) {
        correctGuess -= 1;
      }

      if (isChild) {
        correctGuess += 1;
      }
    }
  };

  reroot(0, -1);

  return result;
};
