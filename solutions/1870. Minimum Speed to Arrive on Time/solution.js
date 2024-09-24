/**
 * @param {number[]} dist
 * @param {number} hour
 * @return {number}
 */
const minSpeedOnTime = function (dist, hour) {
  const size = dist.length;

  if (size - 1 >= hour) return -1;
  const MAX_SPEED = 10 ** 7;
  const calculateReachTime = speed => {
    let result = 0;

    for (let index = 0; index < size - 1; index++) {
      result += Math.ceil(dist[index] / speed);
    }
    return result + dist[size - 1] / speed;
  };
  let left = 1;
  let right = MAX_SPEED;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const reachTime = calculateReachTime(mid);

    reachTime > hour ? (left = mid + 1) : (right = mid);
  }
  return left;
};
