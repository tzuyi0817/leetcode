/**
 * @param {character[][]} box
 * @return {character[][]}
 */
const rotateTheBox = function (box) {
  const OBSTACLE = '*';
  const EMPTY = '.';
  const m = box.length;
  const n = box[0].length;
  const result = Array.from({ length: n }, () => Array.from({ length: m }).fill('.'));

  for (let row = 0; row < m; row++) {
    let fallCol = n - 1;

    for (let col = n - 1; col >= 0; col--) {
      const value = box[row][col];

      if (value === EMPTY) continue;
      if (value === OBSTACLE) {
        fallCol = col;
      }
      result[fallCol][m - row - 1] = value;
      fallCol -= 1;
    }
  }
  return result;
};
