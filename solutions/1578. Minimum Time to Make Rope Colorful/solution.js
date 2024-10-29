/**
 * @param {string} colors
 * @param {number[]} neededTime
 * @return {number}
 */
const minCost = function (colors, neededTime) {
  let currentColor = '';
  let result = (currentMaxTime = 0);

  for (const [index, color] of colors.entries()) {
    const time = neededTime[index];

    if (currentColor === color) {
      result += Math.min(time, currentMaxTime);
      currentMaxTime = Math.max(time, currentMaxTime);
    } else {
      currentColor = color;
      currentMaxTime = time;
    }
  }
  return result;
};
