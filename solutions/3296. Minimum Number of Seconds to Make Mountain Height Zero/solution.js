/**
 * @param {number} mountainHeight
 * @param {number[]} workerTimes
 * @return {number}
 */
const minNumberOfSeconds = function (mountainHeight, workerTimes) {
  const maxWorkerTime = Math.max(...workerTimes);
  let left = 1;
  let right = (maxWorkerTime * (1 + mountainHeight) * mountainHeight) / 2;
  let result = 0;

  const isCompleted = seconds => {
    let reduceHeight = 0;

    for (const time of workerTimes) {
      // 一元二次方程求根公式
      const work = Math.floor(seconds / time);
      const height = Math.floor((-1 + Math.sqrt(1 + 8 * work)) / 2);

      reduceHeight += height;

      if (reduceHeight >= mountainHeight) return true;
    }

    return false;
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (isCompleted(mid)) {
      right = mid - 1;
      result = mid;
    } else {
      left = mid + 1;
    }
  }

  return result;
};
