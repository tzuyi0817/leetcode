/**
 * @param {number[][]} edges
 * @param {number} bob
 * @param {number[]} amount
 * @return {number}
 */
const mostProfitablePath = function (edges, bob, amount) {
  const n = amount.length;
  const graph = Array.from({ length: n }, () => []);
  const bobPath = Array.from({ length: n }, () => -1);

  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const findBobPath = (node, parent, second) => {
    bobPath[node] = second;

    if (node === 0) return true;

    for (const nextNode of graph[node]) {
      if (nextNode === parent) continue;
      if (findBobPath(nextNode, node, second + 1)) return true;
    }

    bobPath[node] = -1;

    return false;
  };

  const getIncome = (alice, bob, income) => {
    if (alice === bob) return income / 2;
    if (alice < bob || bob === -1) return income;

    return 0;
  };

  const travelsTowards = (node, parent, second) => {
    const income = getIncome(second, bobPath[node], amount[node]);
    let result = Number.MIN_SAFE_INTEGER;

    for (const nextNode of graph[node]) {
      if (nextNode === parent) continue;
      const nextIncome = travelsTowards(nextNode, node, second + 1);

      result = Math.max(nextIncome, result);
    }

    return income + (result === Number.MIN_SAFE_INTEGER ? 0 : result);
  };

  findBobPath(bob, -1, 0);

  return travelsTowards(0, -1, 0);
};
