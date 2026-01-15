/**
 * @param {number} n
 * @param {number} m
 * @param {number[]} hBars
 * @param {number[]} vBars
 * @return {number}
 */
const maximizeSquareHoleArea = function (n, m, hBars, vBars) {
  let currentRows = 0;
  let currentCols = 0;
  let maxRows = 0;
  let result = 1;

  hBars.sort((a, b) => a - b);
  vBars.sort((a, b) => a - b);

  for (let index = 0; index < hBars.length; index++) {
    if (hBars[index] - hBars[index - 1] === 1) {
      currentRows += 1;
    } else {
      currentRows = 1;
    }

    maxRows = Math.max(currentRows, maxRows);
  }

  for (let index = 0; index < vBars.length; index++) {
    if (vBars[index] - vBars[index - 1] === 1) {
      currentCols += 1;
    } else {
      currentCols = 1;
    }

    const width = Math.min(currentCols, maxRows) + 1;
    const area = width ** 2;

    result = Math.max(area, result);
  }

  return result;
};
