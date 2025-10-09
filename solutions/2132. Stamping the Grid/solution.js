/**
 * @param {number[][]} grid
 * @param {number} stampHeight
 * @param {number} stampWidth
 * @return {boolean}
 */
const possibleToStamp = function (grid, stampHeight, stampWidth) {
  const m = grid.length;
  const n = grid[0].length;
  const occupied = Array.from({ length: m }, () => new Array(n).fill(0));
  const fit = Array.from({ length: m }, () => new Array(n).fill(false));
  const fitCount = Array.from({ length: m }, () => new Array(n).fill(0));

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = grid[row][col];
      const upperOccupied = occupied[row - 1]?.[col] ?? 0;
      const leftOccupied = occupied[row][col - 1] ?? 0;
      const upperLeftOccupied = occupied[row - 1]?.[col - 1] ?? 0;

      occupied[row][col] = value + upperOccupied + leftOccupied - upperLeftOccupied;

      if (row + 1 < stampHeight || col + 1 < stampWidth) continue;

      const x = row - stampHeight;
      const y = col - stampWidth;
      const upperBoundary = occupied[x]?.[col] ?? 0;
      const leftBoundary = occupied[row][y] ?? 0;
      const upperLeftBoundary = occupied[x]?.[y] ?? 0;

      if (occupied[row][col] - upperBoundary - leftBoundary + upperLeftBoundary === 0) {
        fit[row][col] = true;
      }
    }
  }

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = fit[row][col] ? 1 : 0;
      const upperCount = fitCount[row - 1]?.[col] ?? 0;
      const leftCount = fitCount[row][col - 1] ?? 0;
      const upperLeftCount = fitCount[row - 1]?.[col - 1] ?? 0;

      fitCount[row][col] = value + upperCount + leftCount - upperLeftCount;
    }
  }

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (grid[row][col]) continue;

      const x = Math.min(row + stampHeight, m) - 1;
      const y = Math.min(col + stampWidth, n) - 1;
      const leftCount = fitCount[x][col - 1] ?? 0;
      const upperCount = fitCount[row - 1]?.[y] ?? 0;
      const upperLeftCount = fitCount[row - 1]?.[col - 1] ?? 0;

      if (fitCount[x][y] - upperCount - leftCount + upperLeftCount === 0) {
        return false;
      }
    }
  }

  return true;
};
