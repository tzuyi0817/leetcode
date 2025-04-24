/**
 * @param {number[]} stones
 * @return {boolean}
 */
const stoneGameIX = function (stones) {
  let num0 = 0;
  let num1 = 0;
  let num2 = 0;

  for (const stone of stones) {
    if (stone % 3 === 0) num0 += 1;
    else if (stone % 3 === 1) num1 += 1;
    else num2 += 1;
  }
  if (num0 % 2 === 0) return Math.min(num1, num2) > 0;
  return Math.abs(num1 - num2) > 2;
};
