/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
const findTheWinner = function (n, k) {
  let winner = 0;

  for (let num = 2; num <= n; num++) {
    winner = (winner + k) % num;
  }
  return winner + 1;
};
