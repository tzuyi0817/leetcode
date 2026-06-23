/**
 * @param {number} n
 * @param {number} maxDistance
 * @param {number[][]} roads
 * @return {number}
 */
const numberOfSets = function (n, maxDistance, roads) {
  const maxMask = 1 << n;
  let result = 0;

  const isValidSet = mask => {
    const dist = new Array(n).fill('').map(() => {
      return new Array(n).fill(Number.MAX_SAFE_INTEGER);
    });

    for (const [u, v, w] of roads) {
      if (!((mask >> u) & 1) || !((mask >> v) & 1)) continue;

      dist[u][v] = Math.min(dist[u][v], w);
      dist[v][u] = Math.min(dist[v][u], w);
    }

    for (let index = 0; index < n; index++) {
      if ((mask >> index) & 1) {
        dist[index][index] = 0;
      }
    }

    for (let index = 0; index < n; index++) {
      if (!((mask >> index) & 1)) continue;

      for (let a = 0; a < n; a++) {
        if (!((mask >> a) & 1)) continue;

        for (let b = 0; b < n; b++) {
          if (!((mask >> b) & 1)) continue;

          const newDist = dist[a][index] + dist[b][index];

          dist[a][b] = Math.min(dist[a][b], newDist);
        }
      }
    }

    let maxDist = 0;

    for (let a = 0; a < n; a++) {
      if (!((mask >> a) & 1)) continue;

      for (let b = a + 1; b < n; b++) {
        if (!((mask >> b) & 1)) continue;

        maxDist = Math.max(dist[a][b], maxDist);
      }
    }

    return maxDist <= maxDistance;
  };

  for (let mask = 0; mask < maxMask; mask++) {
    if (isValidSet(mask)) {
      result += 1;
    }
  }

  return result;
};
