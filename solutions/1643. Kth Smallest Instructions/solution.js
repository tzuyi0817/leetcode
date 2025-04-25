/**
 * @param {number[]} destination
 * @param {number} k
 * @return {string}
 */
const kthSmallestPath = function (destination, k) {
  let [row, col] = destination;
  const steps = row + col;
  const comb = Array.from({ length: steps + 1 }, () => new Array(steps + 1).fill(1));
  const result = [];

  for (let a = 2; a <= steps; a++) {
    for (let b = 1; b < a; b++) {
      comb[a][b] = comb[a - 1][b] + comb[a - 1][b - 1];
    }
  }

  for (let step = 1; step <= steps; step++) {
    const count = comb[row + col - 1][col - 1];

    if (count >= k) {
      col -= 1;
      result.push('H');
    } else {
      row -= 1;
      k -= count;
      result.push('V');
    }
  }

  return result.join('');
};
