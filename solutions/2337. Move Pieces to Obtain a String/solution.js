/**
 * @param {string} start
 * @param {string} target
 * @return {boolean}
 */
const canChange = function (start, target) {
  const n = start.length;
  let a = 0;
  let b = 0;

  while (a <= n && b <= n) {
    while (start[a] === '_') a += 1;
    while (target[b] === '_') b += 1;

    if (a === n || b === n) return a === n && b === n;
    const startPieces = start[a];
    const targetPieces = target[b];

    if (startPieces !== targetPieces) return false;
    if (targetPieces === 'L' && a < b) return false;
    if (targetPieces === 'R' && a > b) return false;
    a += 1;
    b += 1;
  }
  return true;
};
