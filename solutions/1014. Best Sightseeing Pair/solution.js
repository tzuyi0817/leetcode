/**
 * @param {number[]} values
 * @return {number}
 */
const maxScoreSightseeingPair = function (values) {
  const n = values.length;
  let preMaxScore = values[0];
  let result = 0;

  for (let index = 1; index < n; index++) {
    const score = values[index];

    result = Math.max(preMaxScore + score - index, result);
    preMaxScore = Math.max(score + index, preMaxScore);
  }
  return result;
};
