/**
 * @param {number[]} tasks
 * @param {number[]} workers
 * @param {number} pills
 * @param {number} strength
 * @return {number}
 */
const maxTaskAssign = function (tasks, workers, pills, strength) {
  const n = tasks.length;
  const m = workers.length;
  let left = 0;
  let right = Math.min(n, m);
  let result = 0;

  tasks.sort((a, b) => a - b);
  workers.sort((a, b) => a - b);

  const isCanComplete = assign => {
    const queue = [];
    let worker = m - 1;
    let remainPills = pills;

    for (let index = assign - 1; index >= 0; index--) {
      const task = tasks[index];

      if (queue.length && queue[0] >= task) {
        queue.shift();
      } else if (worker >= 0 && workers[worker] >= task) {
        worker -= 1;
      } else {
        while (worker >= 0 && workers[worker] + strength >= task) {
          queue.push(workers[worker]);
          worker -= 1;
        }

        if (!queue.length || !remainPills) return false;

        queue.pop();
        remainPills -= 1;
      }
    }

    return true;
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (isCanComplete(mid)) {
      result = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
};
