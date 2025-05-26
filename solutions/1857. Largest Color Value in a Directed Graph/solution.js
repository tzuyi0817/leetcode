/**
 * @param {string} colors
 * @param {number[][]} edges
 * @return {number}
 */
const largestPathValue = function (colors, edges) {
  const n = colors.length;
  const indegree = Array.from({ length: n }, () => 0);
  const graph = new Map();

  for (const [from, to] of edges) {
    indegree[to] += 1;

    if (!graph.has(from)) {
      graph.set(from, []);
    }

    graph.get(from).push(to);
  }

  const BASE_CODE = 'a'.charCodeAt(0);
  const colorCounts = Array.from({ length: n }, () => new Array(26).fill(0));
  let queue = [];
  let visitedCount = 0;
  let result = 0;

  for (let node = 0; node < n; node++) {
    if (indegree[node]) continue;

    queue.push(node);
  }

  while (queue.length) {
    const nextQueue = [];

    for (const node of queue) {
      const color = colors[node].charCodeAt(0) - BASE_CODE;

      visitedCount += 1;
      colorCounts[node][color] += 1;
      result = Math.max(colorCounts[node][color], result);

      if (!graph.has(node)) continue;

      for (const nextNode of graph.get(node)) {
        indegree[nextNode] -= 1;

        for (let code = 0; code < 26; code++) {
          const prevCount = colorCounts[node][code];
          const count = colorCounts[nextNode][code];

          colorCounts[nextNode][code] = Math.max(prevCount, count);
        }

        if (indegree[nextNode]) continue;

        nextQueue.push(nextNode);
      }
    }

    queue = nextQueue;
  }

  return visitedCount === n ? result : -1;
};
