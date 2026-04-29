/**
 * @param {number[][]} grid
 * @return {number}
 */
const maximumScore = function (grid) {
  const n = grid.length;
  const prefixSum = Array.from({ length: n }, () => {
    return new Array(n + 1).fill(0);
  });

  let prevHigh = Array.from({ length: n + 1 }, () => 0);
  let prevLow = Array.from({ length: n + 1 }, () => 0);

  for (let col = 0; col < n; col++) {
    for (let row = 1; row <= n; row++) {
      const value = grid[row - 1][col];

      prefixSum[col][row] = prefixSum[col][row - 1] + value;
    }
  }

  for (let col = 1; col < n; col++) {
    const currentHigh = new Array(n + 1).fill(0);
    const currentLow = new Array(n + 1).fill(0);

    for (let currH = 0; currH <= n; currH++) {
      for (let prevH = 0; prevH <= n; prevH++) {
        if (currH > prevH) {
          const score = prefixSum[col - 1][currH] - prefixSum[col - 1][prevH];
          const total = prevLow[prevH] + score;

          currentHigh[currH] = Math.max(currentHigh[currH], total);
          currentLow[currH] = Math.max(currentLow[currH], total);
        } else {
          const score = prefixSum[col][prevH] - prefixSum[col][currH];

          currentHigh[currH] = Math.max(currentHigh[currH], prevHigh[prevH] + score);
          currentLow[currH] = Math.max(currentLow[currH], prevHigh[prevH]);
        }
      }
    }

    prevHigh = currentHigh;
    prevLow = currentLow;
  }

  return Math.max(...prevHigh);
};
