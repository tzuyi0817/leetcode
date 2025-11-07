/**
 * @param {number[]} stations
 * @param {number} r
 * @param {number} k
 * @return {number}
 */
const maxPower = function (stations, r, k) {
  const n = stations.length;
  const prefixSum = Array.from({ length: n + 1 }, () => 0);
  let left = Math.min(...stations);
  let right = stations.reduce((a, b) => a + b, 0) + k;

  for (let index = 1; index <= n; index++) {
    prefixSum[index] = prefixSum[index - 1] + stations[index - 1];
  }

  const isValidPower = target => {
    const diffs = new Array(n + 2).fill(0);
    let remainStations = k;

    for (let index = 1; index <= n; index++) {
      diffs[index] += diffs[index - 1];

      const left = Math.max(0, index - r - 1);
      const right = Math.min(n, index + r);
      const powers = prefixSum[right] - prefixSum[left] + diffs[index];

      if (powers < target) {
        const needStations = target - powers;

        if (needStations > remainStations) return false;

        const edge = Math.min(n + 1, index + r * 2 + 1);

        remainStations -= needStations;
        diffs[index] += needStations;
        diffs[edge] -= needStations;
      }
    }

    return true;
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    isValidPower(mid) ? (left = mid + 1) : (right = mid - 1);
  }

  return right;
};
