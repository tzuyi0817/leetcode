/**
 * @param {number} n
 * @param {number[][]} buildings
 * @return {number}
 */
const countCoveredBuildings = function (n, buildings) {
  const rows = Array.from({ length: n + 1 }, () => ({ max: -1, min: n + 1 }));
  const cols = Array.from({ length: n + 1 }, () => ({ max: -1, min: n + 1 }));

  for (const [row, col] of buildings) {
    rows[row].max = Math.max(rows[row].max, col);
    rows[row].min = Math.min(rows[row].min, col);
    cols[col].max = Math.max(cols[col].max, row);
    cols[col].min = Math.min(cols[col].min, row);
  }

  return buildings.reduce((result, [row, col]) => {
    const isColCovered = col > rows[row].min && col < rows[row].max;
    const isRowCovered = row > cols[col].min && row < cols[col].max;
    const isCovered = isColCovered && isRowCovered;

    return result + (isCovered ? 1 : 0);
  }, 0);
};
