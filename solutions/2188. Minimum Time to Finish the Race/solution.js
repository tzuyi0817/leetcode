/**
 * @param {number[][]} tires
 * @param {number} changeTime
 * @param {number} numLaps
 * @return {number}
 */
const minimumFinishTime = function (tires, changeTime, numLaps) {
  const n = tires.length;
  const singleTire = Array.from({ length: numLaps + 1 }, () => {
    return Number.MAX_SAFE_INTEGER;
  });
  const dp = Array.from({ length: numLaps + 1 }, () => Number.MAX_SAFE_INTEGER);

  dp[0] = 0;

  for (let index = 0; index < n; index++) {
    const [f, r] = tires[index];
    let power = 1;
    let totalTime = 0;

    for (let lap = 1; lap <= numLaps; lap++) {
      const time = f * power;

      if (time >= changeTime + f) break;

      totalTime += time;
      power *= r;
      singleTire[lap] = Math.min(totalTime, singleTire[lap]);
    }
  }

  for (let a = 1; a <= numLaps; a++) {
    for (let b = 1; b <= a; b++) {
      const changeTrie = changeTime + dp[a - b] + singleTire[b];

      dp[a] = Math.min(changeTrie, dp[a]);
    }
  }

  return dp[numLaps] - changeTime;
};
