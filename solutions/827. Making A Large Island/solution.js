/**
 * @param {number[][]} grid
 * @return {number}
 */
const largestIsland = function (grid) {
  const n = grid.length;

  const getGroupArea = (row, col, group) => {
    if (row >= n || col >= n || row < 0 || col < 0) return 0;
    if (grid[row][col] !== 1) return 0;

    grid[row][col] = group;

    const leftArea = getGroupArea(row, col - 1, group);
    const rightArea = getGroupArea(row, col + 1, group);
    const upperArea = getGroupArea(row - 1, col, group);
    const lowerArea = getGroupArea(row + 1, col, group);

    return 1 + leftArea + rightArea + upperArea + lowerArea;
  };
  const groupMap = new Map();
  let group = 2;

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (grid[row][col] !== 1) continue;
      const area = getGroupArea(row, col, group);

      groupMap.set(group, area);
      group += 1;
    }
  }
  let result = 0;

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (grid[row][col] !== 0) continue;
      const leftGroup = grid[row][col - 1];
      const rightGroup = grid[row][col + 1];
      const upperGroup = grid[row - 1]?.[col];
      const lowerGroup = grid[row + 1]?.[col];
      const groups = new Set([leftGroup, rightGroup, upperGroup, lowerGroup]);
      let area = 1;

      for (const group of groups) {
        area += groupMap.get(group) ?? 0;
      }
      result = Math.max(area, result);
    }
  }
  return result || n * n;
};
