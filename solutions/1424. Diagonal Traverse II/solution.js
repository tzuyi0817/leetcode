/**
 * @param {number[][]} nums
 * @return {number[]}
 */
const findDiagonalOrder = function (nums) {
  const diagonalOrder = [];

  for (const [row, num] of nums.entries()) {
    for (const [col, value] of num.entries()) {
      const order = row + col;
      const diagonal = diagonalOrder[order];

      diagonal ? diagonal.unshift(value) : (diagonalOrder[order] = [value]);
    }
  }
  return diagonalOrder.flat();
};
