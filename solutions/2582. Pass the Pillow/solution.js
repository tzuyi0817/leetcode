/**
 * @param {number} n
 * @param {number} time
 * @return {number}
 */
const passThePillow = function (n, time) {
  const isReverse = Math.floor(time / (n - 1)) % 2;
  const position = time % (n - 1);

  return isReverse ? n - position : position + 1;
};
