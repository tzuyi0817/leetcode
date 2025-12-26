/**
 * @param {number[]} rolls
 * @param {number} k
 * @return {number}
 */
const shortestSequence = function (rolls, k) {
  const diceSet = new Set();
  let result = 1;

  for (const roll of rolls) {
    diceSet.add(roll);

    if (diceSet.size === k) {
      result += 1;
      diceSet.clear();
    }
  }

  return result;
};
