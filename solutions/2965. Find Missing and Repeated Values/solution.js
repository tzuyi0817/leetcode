/**
 * @param {number[][]} grid
 * @return {number[]}
 */
const findMissingAndRepeatedValues = function (grid) {
  const n = grid.length;
  const nums = Array.from({ length: n ** 2 + 1 }, () => 0);
  let a = 0;
  let b = 0;

  for (const values of grid) {
    for (const value of values) {
      nums[value] += 1;
    }
  }

  for (let num = 1; num <= n ** 2; num++) {
    const count = nums[num];

    if (!count) b = num;
    if (count === 2) a = num;
    if (a && b) return [a, b];
  }

  return [];
};
