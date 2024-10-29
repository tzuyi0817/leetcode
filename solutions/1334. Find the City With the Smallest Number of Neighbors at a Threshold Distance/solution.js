/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} distanceThreshold
 * @return {number}
 */
const findTheCity = function (n, edges, distanceThreshold) {
  const distances = new Array(n).fill('').map(_ => new Array(n).fill(Number.MAX_SAFE_INTEGER));

  for (const [from, to, weight] of edges) {
    distances[from][from] = 0;
    distances[to][to] = 0;
    distances[from][to] = distances[to][from] = weight;
  }
  for (let k = 0; k < n; k++) {
    for (let from = 0; from < n; from++) {
      for (let to = 0; to < n; to++) {
        if (distances[from][to] <= distances[from][k] + distances[k][to]) continue;

        distances[from][to] = distances[from][k] + distances[k][to];
      }
    }
  }
  let result = 0;
  let minCities = n;

  for (let index = 0; index < n; index++) {
    const cities = distances[index].filter(distance => {
      return distance && distance <= distanceThreshold;
    }).length;

    if (cities > minCities) continue;
    result = index;
    minCities = cities;
  }
  return result;
};
