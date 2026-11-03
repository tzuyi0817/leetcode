/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[][]}
 */
const constructGridLayout = function (n, edges) {
  const graph = Array.from({ length: n }, () => []);
  const seen = Array.from({ length: n }, () => false);
  let conner = 0;

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  for (let node = 1; node < n; node++) {
    if (graph[node].length < graph[conner].length) {
      conner = node;
    }
  }

  seen[conner] = true;

  const connerIndegree = graph[conner].length;
  const firstRow = [conner];

  while (firstRow.length === 1 || graph[firstRow.at(-1)].length === connerIndegree + 1) {
    const neighbors = graph[firstRow.at(-1)].toSorted((a, b) => {
      return graph[a].length - graph[b].length;
    });

    const target = neighbors.find(node => {
      if (seen[node]) return false;

      const indegree = graph[node].length;

      return indegree === connerIndegree || indegree === connerIndegree + 1;
    });

    seen[target] = true;
    firstRow.push(target);
  }

  const cols = firstRow.length;
  const rows = n / cols;
  const result = Array.from({ length: rows }, () => []);

  result[0] = firstRow;

  for (let row = 1; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const prev = result[row - 1][col];
      const neighbors = graph[prev];
      const target = neighbors.find(node => !seen[node]);

      result[row][col] = target;
      seen[target] = true;
    }
  }

  return result;
};
