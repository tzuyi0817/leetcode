/**
 * @param {number[]} parent
 * @param {string} s
 * @return {number}
 */
const longestPath = function (parent, s) {
  const n = parent.length;
  const graph = Array.from({ length: n }, () => []);
  let result = 1;

  const findLongestPath = node => {
    let max1 = 0;
    let max2 = 0;

    for (const neighbor of graph[node]) {
      const len = findLongestPath(neighbor);

      if (s[node] === s[neighbor]) continue;
      if (len > max1) {
        max2 = max1;
        max1 = len;
      } else if (len > max2) {
        max2 = len;
      }
    }

    result = Math.max(1 + max1 + max2, result);

    return 1 + max1;
  };

  for (let node = 1; node < n; node++) {
    graph[parent[node]].push(node);
  }

  findLongestPath(0);

  return result;
};
