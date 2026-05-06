/**
 * @param {character[][]} boxGrid
 * @return {character[][]}
 */
const rotateTheBox = function (boxGrid) {
  const m = boxGrid.length;
  const n = boxGrid[0].length;
  const EMPTY = '.';
  const OBSTACLE = '*';
  const result = Array.from({ length: n }, () => new Array(m).fill('.'));

  for (let row = 0; row < m; row++) {
    let prevEmpty = n - 1;

    for (let col = n - 1; col >= 0; col--) {
      const value = boxGrid[row][col];

      if (value === EMPTY) continue;

      const rotatedCol = m - row - 1;

      if (value === OBSTACLE) {
        result[col][rotatedCol] = value;
        prevEmpty = col - 1;
      } else {
        result[prevEmpty][rotatedCol] = value;
        prevEmpty -= 1;
      }
    }
  }

  return result;
};
