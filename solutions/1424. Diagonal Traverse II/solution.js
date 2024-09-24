/**
 * @param {number[][]} nums
 * @return {number[]}
 */
const findDiagonalOrder = function (nums) {
  const diagonalOrder = [];

  for (let row = 0; row < nums.length; row++) {
    for (let col = 0; col < nums[row].length; col++) {
      const value = nums[row][col];
      const order = row + col;
      const diagonal = diagonalOrder[order];

      diagonal ? diagonal.unshift(value) : (diagonalOrder[order] = [value]);
    }
  }
  return diagonalOrder.flat();
};
