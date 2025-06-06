/**
 * @param {string} target
 * @return {number}
 */
const minFlips = function (target) {
  let result = 0;
  let current = 0;

  for (const value of target) {
    if (+value === current) continue;
    current ^= 1;
    result += 1;
  }
  return result;
};
