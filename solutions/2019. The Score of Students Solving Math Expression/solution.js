/**
 * @param {string} s
 * @param {number[]} answers
 * @return {number}
 */
const scoreOfStudents = function (s, answers) {
  const n = s.length;
  const ANSWER_LIMIT = 1000;

  const compute = () => {
    const solves = s.split('+');

    return solves.reduce((result, solve) => {
      let current = Number(solve[0]);

      for (let index = 2; index < solve.length; index += 2) {
        current *= solve[index];
      }

      return result + current;
    }, 0);
  };

  const correctAnswer = compute();
  const dp = Array.from({ length: n }, () => new Array(n).fill(-1));

  const getScores = (left, right) => {
    if (left === right) {
      const num = Number(s[left]);

      dp[left][right] = new Set([num]);

      return dp[left][right];
    }

    if (dp[left][right] !== -1) return dp[left][right];

    const result = new Set();

    for (let index = left + 1; index < right; index += 2) {
      const leftScores = getScores(left, index - 1);
      const rightScores = getScores(index + 1, right);

      for (const scoreA of leftScores) {
        for (const scoreB of rightScores) {
          const operation = s[index];
          const score = operation === '+' ? scoreA + scoreB : scoreA * scoreB;

          if (score > ANSWER_LIMIT) continue;

          result.add(score);
        }
      }
    }

    dp[left][right] = result;

    return result;
  };

  const scores = getScores(0, n - 1);

  return answers.reduce((result, answer) => {
    if (answer === correctAnswer) return result + 5;
    if (scores.has(answer)) return result + 2;

    return result;
  }, 0);
};
