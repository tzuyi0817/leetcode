/**
 * @param {number[]} nums
 * @param {number[][]} edges
 * @return {number}
 */
const componentValue = function (nums, edges) {
  const n = nums.length;
  const totalSum = nums.reduce((total, num) => total + num);
  const graph = Array.from({ length: n }, () => []);

  const dfs = (node, parent, target) => {
    let sum = nums[node];

    for (const neighbor of graph[node]) {
      if (parent === neighbor) continue;

      sum += dfs(neighbor, node, target);

      if (sum > target) return Number.MAX_SAFE_INTEGER;
    }

    if (sum === target) return 0;

    return sum;
  };

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  for (let index = n; index > 1; index--) {
    if (totalSum % index !== 0) continue;

    if (dfs(0, -1, totalSum / index) === 0) {
      return index - 1;
    }
  }

  return 0;
};
