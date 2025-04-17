/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
const countSubgraphsForEachDiameter = function (n, edges) {
  const maxMask = 1 << n;
  const dists = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(n));
  const result = Array.from({ length: n - 1 }, () => 0);

  for (let city = 1; city <= n; city++) {
    dists[city][city] = 0;
  }

  for (const [u, v] of edges) {
    dists[u][v] = 1;
    dists[v][u] = 1;
  }

  for (let k = 1; k <= n; k++) {
    for (let u = 1; u <= n; u++) {
      for (let v = 1; v <= n; v++) {
        dists[u][v] = Math.min(dists[u][v], dists[u][k] + dists[k][v]);
      }
    }
  }

  const getMaxDist = mask => {
    let maxDist = 0;
    let cityCount = 0;
    let edgeCount = 0;

    for (let u = 1; u <= n; u++) {
      if ((mask & (1 << (u - 1))) === 0) continue;

      cityCount += 1;

      for (let v = u + 1; v <= n; v++) {
        if ((mask & (1 << (v - 1))) === 0) continue;
        const dist = dists[u][v];

        if (dist === 1) edgeCount += 1;

        maxDist = Math.max(dist, maxDist);
      }
    }

    return cityCount - 1 === edgeCount ? maxDist : 0;
  };

  for (let mask = 1; mask < maxMask; mask++) {
    const maxDist = getMaxDist(mask);

    if (!maxDist) continue;

    result[maxDist - 1] += 1;
  }

  return result;
};
