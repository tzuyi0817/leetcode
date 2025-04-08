/**
 * @param {number[][]} targetGrid
 * @return {boolean}
 */
const isPrintable = function (targetGrid) {
  const m = targetGrid.length;
  const n = targetGrid[0].length;
  const colorMap = new Map();

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const color = targetGrid[row][col];
      const coord = colorMap.get(color) ?? { top: row, left: col, bottom: row, right: col };

      coord.top = Math.min(row, coord.top);
      coord.left = Math.min(col, coord.left);
      coord.bottom = Math.max(row, coord.bottom);
      coord.right = Math.max(col, coord.right);
      colorMap.set(color, coord);
    }
  }

  const graph = new Map();
  const indegreeMap = new Map();

  for (const [color, coord] of colorMap) {
    for (let row = coord.top; row <= coord.bottom; row++) {
      for (let col = coord.left; col <= coord.right; col++) {
        const currentColor = targetGrid[row][col];

        if (color === currentColor) continue;
        if (!graph.has(currentColor)) {
          graph.set(currentColor, new Set());
        }
        const colors = graph.get(currentColor);

        if (colors.has(color)) continue;
        const indegree = indegreeMap.get(color) ?? 0;

        colors.add(color);
        indegreeMap.set(color, indegree + 1);
      }
    }
  }

  let queue = [];
  let printed = 0;

  for (const color of colorMap.keys()) {
    if (indegreeMap.has(color)) continue;

    queue.push(color);
  }

  while (queue.length) {
    const nextQueue = [];

    for (const color of queue) {
      printed += 1;

      if (!graph.has(color)) continue;

      for (const nextColor of graph.get(color)) {
        const indegree = indegreeMap.get(nextColor);

        if (indegree - 1 === 0) {
          nextQueue.push(nextColor);
        }

        indegreeMap.set(nextColor, indegree - 1);
      }
    }

    queue = nextQueue;
  }

  return printed === colorMap.size;
};
