/**
 * @param {number} n
 * @return {number}
 */
const twoEggDrop = function (n) {
  const calculateMoves = drop => Math.ceil(((drop + 1) * drop) / 2);
  let left = 1;
  let right = n;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const moves = calculateMoves(mid);

    if (moves === n) return mid;
    calculateMoves(mid) > n ? (right = mid) : (left = mid + 1);
  }
  return right;
};
