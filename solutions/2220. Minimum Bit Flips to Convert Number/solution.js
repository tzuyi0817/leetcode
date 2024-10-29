/**
 * @param {number} start
 * @param {number} goal
 * @return {number}
 */
const minBitFlips = function (start, goal) {
  const xor = (start ^ goal).toString(2);
  let result = 0;

  for (const element of xor) {
    if (element === '0') continue;
    result += 1;
  }
  return result;
};
