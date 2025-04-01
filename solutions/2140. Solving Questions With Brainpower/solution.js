/**
 * @param {number[][]} questions
 * @return {number}
 */
const mostPoints = function (questions) {
  const n = questions.length;
  const dp = Array.from({ length: n }, () => -1);

  const solveQuestion = index => {
    if (index >= n) return 0;
    if (dp[index] !== -1) return dp[index];
    const skipPoints = solveQuestion(index + 1);
    const [points, brainpower] = questions[index];
    const solvePoints = points + solveQuestion(index + brainpower + 1);
    const result = Math.max(skipPoints, solvePoints);

    dp[index] = result;

    return result;
  };

  return solveQuestion(0);
};
