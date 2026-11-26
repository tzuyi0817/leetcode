/**
 * @param {number} n
 * @return {boolean}
 */
const canAliceWin = function (n) {
  let removalStones = 10;

  while (n >= removalStones) {
    n -= removalStones;
    removalStones -= 1;
  }

  return removalStones % 2 === 1;
};
