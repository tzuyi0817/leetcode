/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
const findChampion = function (n, edges) {
  const indegree = Array.from({ length: n }, () => 0);
  let result = -1;

  for (const [a, b] of edges) {
    indegree[b] += 1;
  }

  for (let team = 0; team < n; team++) {
    if (indegree[team]) continue;
    if (result !== -1) return -1;
    result = team;
  }
  return result;
};
