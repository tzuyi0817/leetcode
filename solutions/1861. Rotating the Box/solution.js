/**
 * @param {character[][]} box
 * @return {character[][]}
 */
const rotateTheBox = function (box) {
  const m = box.length;
  const n = box[0].length;
  const result = Array(n)
    .fill('')
    .map(_ => Array(m).fill('.'));

  for (let row = 0; row < m; row++) {
    let fallRow = n - 1;

    for (let col = n - 1; col >= 0; col--) {
      const value = box[row][col];

      if (value === '.') continue;
      if (value === '*') fallRow = col;
      result[fallRow][m - row - 1] = value;
      fallRow -= 1;
    }
  }
  return result;
};
