/**
 * @param {number[]} landStartTime
 * @param {number[]} landDuration
 * @param {number[]} waterStartTime
 * @param {number[]} waterDuration
 * @return {number}
 */
const earliestFinishTime = function (landStartTime, landDuration, waterStartTime, waterDuration) {
  const getMinFinishTime = (ridesA, ridesB) => {
    const n = ridesA.startTime.length;
    const m = ridesB.startTime.length;
    let minFirstFinishTime = Number.MAX_SAFE_INTEGER;
    let result = Number.MAX_SAFE_INTEGER;

    for (let index = 0; index < n; index++) {
      const { startTime, duration } = ridesA;
      const finishTime = startTime[index] + duration[index];

      minFirstFinishTime = Math.min(finishTime, minFirstFinishTime);
    }

    for (let index = 0; index < m; index++) {
      const { startTime, duration } = ridesB;
      const start = Math.max(startTime[index], minFirstFinishTime);
      const finishTime = start + duration[index];

      result = Math.min(finishTime, result);
    }

    return result;
  };

  const landRides = { startTime: landStartTime, duration: landDuration };
  const waterRides = { startTime: waterStartTime, duration: waterDuration };
  const landFirst = getMinFinishTime(landRides, waterRides);
  const waterFirst = getMinFinishTime(waterRides, landRides);

  return Math.min(landFirst, waterFirst);
};
