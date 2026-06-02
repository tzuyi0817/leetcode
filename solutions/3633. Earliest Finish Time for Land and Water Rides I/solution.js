/**
 * @param {number[]} landStartTime
 * @param {number[]} landDuration
 * @param {number[]} waterStartTime
 * @param {number[]} waterDuration
 * @return {number}
 */
const earliestFinishTime = function (landStartTime, landDuration, waterStartTime, waterDuration) {
  const n = landStartTime.length;
  const m = waterStartTime.length;
  let minLandTime = Number.MAX_SAFE_INTEGER;
  let minWaterTime = Number.MAX_SAFE_INTEGER;
  let result = Number.MAX_SAFE_INTEGER;

  for (let index = 0; index < n; index++) {
    const landTime = landStartTime[index] + landDuration[index];

    minLandTime = Math.min(landTime, minLandTime);
  }

  for (let index = 0; index < m; index++) {
    const waterTime = waterStartTime[index] + waterDuration[index];

    minWaterTime = Math.min(waterTime, minWaterTime);
  }

  for (let index = 0; index < n; index++) {
    const startTime = Math.max(landStartTime[index], minWaterTime);

    result = Math.min(startTime + landDuration[index], result);
  }

  for (let index = 0; index < m; index++) {
    const startTime = Math.max(waterStartTime[index], minLandTime);

    result = Math.min(startTime + waterDuration[index], result);
  }

  return result;
};
