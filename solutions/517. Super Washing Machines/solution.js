/**
 * @param {number[]} machines
 * @return {number}
 */
const findMinMoves = function (machines) {
  const n = machines.length;
  const dresses = machines.reduce((total, dress) => total + dress);

  if (dresses % n) return -1;
  const average = dresses / n;
  let current = (result = 0);

  for (const dress of machines) {
    const canMoveDresses = dress - average;

    current += canMoveDresses;
    result = Math.max(Math.abs(current), canMoveDresses, result);
  }
  return result;
};
