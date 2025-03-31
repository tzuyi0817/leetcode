/**
 * @param {number[]} weights
 * @param {number} k
 * @return {number}
 */
const putMarbles = function (weights, k) {
  const n = weights.length;
  const scores = [];

  for (let index = 1; index < n; index++) {
    const score = weights[index] + weights[index - 1];

    scores.push(score);
  }

  scores.sort((a, b) => a - b);

  let minScores = weights[0] + weights[n - 1];
  let maxScores = weights[0] + weights[n - 1];

  for (let index = 0; index < k - 1; index++) {
    minScores += scores[index];
    maxScores += scores[n - 2 - index];
  }

  return maxScores - minScores;
};
