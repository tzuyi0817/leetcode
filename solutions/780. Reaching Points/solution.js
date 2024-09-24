/**
 * @param {number} sx
 * @param {number} sy
 * @param {number} tx
 * @param {number} ty
 * @return {boolean}
 */
const reachingPoints = function (sx, sy, tx, ty) {
  while (tx >= sx && ty >= sy) {
    tx > ty ? (tx %= ty) : (ty %= tx);

    if (sx === tx) return (ty - sy) % sx === 0;
    if (sy === ty) return (tx - sx) % sy === 0;
  }
  return sx === tx && sy === ty;
};
