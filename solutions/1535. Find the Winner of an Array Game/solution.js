/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
const getWinner = function (arr, k) {
  let current = arr[0];
  let winRounds = 0;

  for (let index = 1; index < arr.length; index++) {
    const integer = arr[index];

    if (integer > current) {
      current = integer;
      winRounds = 1;
    } else {
      winRounds += 1;
    }
    if (winRounds === k) return current;
  }
  return current;
};
