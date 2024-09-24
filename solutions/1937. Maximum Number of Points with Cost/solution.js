/**
 * @param {number[][]} points
 * @return {number}
 */
const maxPoints = function (points) {
  const n = points[0].length;
  const dp = Array(n).fill(0);

  for (const row of points) {
    const startLeft = Array(n);
    const startRight = Array(n);
    let score = 0;

    for (let col = 0; col < n; col++) {
      score = Math.max(score - 1, dp[col]);
      startLeft[col] = score;
    }
    score = 0;
    for (let col = n - 1; col >= 0; col--) {
      score = Math.max(score - 1, dp[col]);
      startRight[col] = score;
    }
    for (let col = 0; col < n; col++) {
      dp[col] = Math.max(startLeft[col], startRight[col], dp[col]) + row[col];
    }
  }
  return Math.max(...dp);
};
