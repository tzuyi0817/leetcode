/**
 * @param {number[]} jobDifficulty
 * @param {number} d
 * @return {number}
 */
const minDifficulty = function (jobDifficulty, d) {
  const n = jobDifficulty.length;

  if (n < d) return -1;
  const memo = Array.from({ length: n }, () => new Array(d).fill(-1));
  const maxDifficultyJobs = Array.from({ length: n }, () => 0);
  let currentMaxDifficulty = 0;

  for (let index = n - 1; index >= 0; index--) {
    currentMaxDifficulty = Math.max(jobDifficulty[index], currentMaxDifficulty);
    maxDifficultyJobs[index] = currentMaxDifficulty;
  }

  const finishJobs = (job, day) => {
    if (day === d) return maxDifficultyJobs[job];
    if (memo[job][day] !== -1) return memo[job][day];
    let maxDifficulty = 0;
    let result = Number.MAX_SAFE_INTEGER;

    for (let index = job; index < n - (d - day); index++) {
      maxDifficulty = Math.max(jobDifficulty[index], maxDifficulty);

      const difficulty = maxDifficulty + finishJobs(index + 1, day + 1);

      result = Math.min(difficulty, result);
    }
    memo[job][day] = result;

    return result;
  };

  return finishJobs(0, 1);
};
