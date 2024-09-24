/**
 * @param {number[]} dist
 * @param {number[]} speed
 * @return {number}
 */
const eliminateMaximum = function (dist, speed) {
  const size = dist.length;
  const reachTimes = dist.map((distance, index) => Math.ceil(distance / speed[index]));

  reachTimes.sort((a, b) => a - b);

  for (let minute = 0; minute < size; minute++) {
    if (minute < reachTimes[minute]) continue;
    return minute;
  }
  return size;
};
