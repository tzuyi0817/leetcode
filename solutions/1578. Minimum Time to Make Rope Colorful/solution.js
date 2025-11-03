/**
 * @param {string} colors
 * @param {number[]} neededTime
 * @return {number}
 */
const minCost = function (colors, neededTime) {
  const n = colors.length;
  let result = 0;
  let maxNeededTime = neededTime[0];

  for (let index = 1; index < n; index++) {
    const time = neededTime[index];

    if (colors[index] === colors[index - 1]) {
      result += Math.min(time, maxNeededTime);
      maxNeededTime = Math.max(time, maxNeededTime);
    } else {
      maxNeededTime = time;
    }
  }

  return result;
};
