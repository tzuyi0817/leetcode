/**
 * @param {number[][]} grid
 * @return {number[]}
 */
const getBiggestThree = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const updateValues = value => {
    if (first === value || second === value || third === value) return;
    if (first < value) {
      third = second;
      second = first;
      first = value;
    } else if (second < value) {
      third = second;
      second = value;
    } else if (third < value) third = value;
  };
  let first = 0;
  let second = 0;
  let third = 0;

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = grid[row][col];
      const boundary = Math.min(m - row - 1, n - col - 1, row, col);

      updateValues(value);
      if (boundary <= 0) continue;
      for (let length = 1; length <= boundary; length++) {
        let sum = (offset = 0);

        for (let current = length; current >= 1; current--) {
          sum +=
            grid[row - current][col + offset] +
            grid[row + offset][col + current] +
            grid[row + current][col - offset] +
            grid[row - offset][col - current];

          offset += 1;
        }
        updateValues(sum);
      }
    }
  }
  return [first, second, third].filter(Boolean);
};
