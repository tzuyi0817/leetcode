/**
 * @param {string} moves
 * @return {number}
 */
const furthestDistanceFromOrigin = function (moves) {
  let left = 0;
  let right = 0;
  let custom = 0;

  for (const move of moves) {
    if (move === 'L') {
      left += 1;
    } else if (move === 'R') {
      right += 1;
    } else {
      custom += 1;
    }
  }

  return Math.abs(left - right) + custom;
};
