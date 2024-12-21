/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} values
 * @param {number} k
 * @return {number}
 */
const maxKDivisibleComponents = function (n, edges, values, k) {
  const graph = Array.from({ length: n }, () => []);
  let result = 0;

  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const splitTree = (node, previous) => {
    let sum = values[node];

    for (const nextNode of graph[node] ?? []) {
      if (nextNode === previous) continue;
      sum += splitTree(nextNode, node);
    }
    if (sum % k === 0) result += 1;

    return sum;
  };

  splitTree(0, -1);

  return result;
};
