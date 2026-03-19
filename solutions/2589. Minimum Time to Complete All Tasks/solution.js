/**
 * @param {number[][]} tasks
 * @return {number}
 */
const findMinimumTime = function (tasks) {
  const runningSet = new Set();

  tasks.sort((a, b) => a[1] - b[1]);

  for (const [start, end, duration] of tasks) {
    let alreadyRunning = 0;

    for (let index = start; index <= end; index++) {
      if (runningSet.has(index)) {
        alreadyRunning += 1;
      }
    }

    if (duration <= alreadyRunning) continue;

    let time = end;
    let needRunning = duration - alreadyRunning;

    while (needRunning) {
      if (!runningSet.has(time)) {
        needRunning -= 1;
        runningSet.add(time);
      }

      time -= 1;
    }
  }

  return runningSet.size;
};
