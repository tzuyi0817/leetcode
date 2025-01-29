/**
 * @param {number[]} satisfaction
 * @return {number}
 */
const maxSatisfaction = function (satisfaction) {
  let sumSatisfaction = 0;
  let result = 0;

  satisfaction.sort((a, b) => b - a);

  for (const value of satisfaction) {
    sumSatisfaction += value;

    if (sumSatisfaction < 0) return result;

    result += sumSatisfaction;
  }
  return result;
};
