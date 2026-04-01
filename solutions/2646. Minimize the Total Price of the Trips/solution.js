/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} price
 * @param {number[][]} trips
 * @return {number}
 */
const minimumTotalPrice = function (n, edges, price, trips) {
  const graph = Array.from({ length: n }, () => []);
  const tripCounts = Array.from({ length: n }, () => 0);

  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const dfsTripCount = (node, prev, end, path) => {
    if (node === end) {
      for (const tripNode of path) {
        tripCounts[tripNode] += 1;
      }

      return;
    }

    for (const neighbor of graph[node]) {
      if (neighbor === prev) continue;

      path.push(neighbor);
      dfsTripCount(neighbor, node, end, path);
      path.pop();
    }
  };

  for (const [start, end] of trips) {
    dfsTripCount(start, -1, end, [start]);
  }

  const dp = Array.from({ length: n }, () => {
    return new Array(2).fill(-1);
  });

  const getTotalTripPrice = (node, prev, parentHalved) => {
    if (dp[node][Number(parentHalved)] !== -1) {
      return dp[node][Number(parentHalved)];
    }

    let totalPrice = price[node] * tripCounts[node];

    for (const neighbor of graph[node]) {
      if (neighbor === prev) continue;

      totalPrice += getTotalTripPrice(neighbor, node, false);
    }

    if (parentHalved) {
      dp[node][Number(parentHalved)] = totalPrice;

      return totalPrice;
    }

    let halveTotalPrice = (price[node] / 2) * tripCounts[node];

    for (const neighbor of graph[node]) {
      if (neighbor === prev) continue;

      halveTotalPrice += getTotalTripPrice(neighbor, node, true);
    }

    const result = Math.min(totalPrice, halveTotalPrice);

    dp[node][Number(parentHalved)] = result;

    return result;
  };

  return getTotalTripPrice(0, -1, false);
};
