/**
 * @param {number[]} plantTime
 * @param {number[]} growTime
 * @return {number}
 */
const earliestFullBloom = function (plantTime, growTime) {
  const n = plantTime.length;
  const times = plantTime.map((plant, index) => {
    return { plant, grow: growTime[index] };
  });
  let currentTime = 0;
  let result = 0;

  times.sort((a, b) => b.grow - a.grow);

  for (let index = 0; index < n; index++) {
    const time = times[index];

    currentTime += time.plant;
    result = Math.max(currentTime + time.grow, result);
  }

  return result;
};
