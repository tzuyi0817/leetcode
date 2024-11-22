/**
 * @param {number} n
 * @param {number} m
 * @param {number[]} group
 * @param {number[][]} beforeItems
 * @return {number[]}
 */
const sortItems = function (n, m, group, beforeItems) {
  const graph = Array.from({ length: n + m }, () => []);
  const indegree = Array.from({ length: n + m }, () => 0);

  for (let index = 0; index < n; index++) {
    if (group[index] === -1) continue;

    graph[n + group[index]].push(index);
    indegree[index] += 1;
  }

  for (let index = 0; index < n; index++) {
    const item = group[index] === -1 ? index : n + group[index];

    for (const before of beforeItems[index]) {
      const beforeItem = group[before] === -1 ? before : n + group[before];

      if (item === beforeItem) {
        graph[before].push(index);
        indegree[index] += 1;
      } else {
        graph[beforeItem].push(item);
        indegree[item] += 1;
      }
    }
  }
  const result = [];

  const dfs = item => {
    if (item < n) result.push(item);

    indegree[item] = -1;

    for (const next of graph[item] ?? []) {
      indegree[next] -= 1;

      if (!indegree[next]) dfs(next);
    }
  };

  for (let index = 0; index < n + m; index++) {
    if (!indegree[index]) dfs(index);
  }
  return result.length < n ? [] : result;
};
