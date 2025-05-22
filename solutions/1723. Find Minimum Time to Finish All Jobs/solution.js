/**
 * @param {number[]} jobs
 * @param {number} k
 * @return {number}
 */
const minimumTimeRequired = function (jobs, k) {
  const n = jobs.length;
  const workers = Array.from({ length: k }, () => 0);
  let result = Number.MAX_SAFE_INTEGER;

  jobs.sort((a, b) => b - a);

  const assignJob = (index, maxTime) => {
    if (maxTime >= result) return;
    if (index >= n) {
      result = Math.min(maxTime, result);
      return;
    }
    const time = jobs[index];

    for (let worker = 0; worker < k; worker++) {
      workers[worker] += time;

      const nextMaxTime = Math.max(workers[worker], maxTime);

      assignJob(index + 1, nextMaxTime);
      workers[worker] -= time;

      if (workers[worker] === 0) return;
    }
  };

  assignJob(0, 0);

  return result;
};
