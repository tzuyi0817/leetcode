/**
 * @param {number[][]} grid
 * @return {number}
 */
const largestIsland = function (grid) {
  const n = grid.length;

  const getIslandSize = (row, col, id) => {
    if (row < 0 || col < 0 || row >= n || col >= n) return 0;
    if (grid[row][col] !== 1) return 0;

    grid[row][col] = id;

    const top = getIslandSize(row - 1, col, id);
    const down = getIslandSize(row + 1, col, id);
    const left = getIslandSize(row, col - 1, id);
    const right = getIslandSize(row, col + 1, id);

    return 1 + top + down + left + right;
  };
  const islands = Array(n ** 2 + 2).fill(0);
  let groupId = 2;

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (!grid[row][col]) continue;

      islands[groupId] = getIslandSize(row, col, groupId);
      groupId += 1;
    }
  }
  let result = 0;

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (grid[row][col] > 0) continue;
      const top = grid[row - 1]?.[col] ?? 0;
      const down = grid[row + 1]?.[col] ?? 0;
      const left = grid[row][col - 1] ?? 0;
      const right = grid[row][col + 1] ?? 0;
      const islandGroups = new Set([top, down, left, right]);
      let size = 1;

      for (const groupId of islandGroups) {
        size += islands[groupId];
      }
      result = Math.max(size, result);
    }
  }
  return result ? result : n ** 2;
};
