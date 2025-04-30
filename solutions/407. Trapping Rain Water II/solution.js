/**
 * @param {number[][]} heightMap
 * @return {number}
 */
const trapRainWater = function (heightMap) {
  const m = heightMap.length;
  const n = heightMap[0].length;
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const queue = new MinPriorityQueue({ priority: ({ height }) => height });
  const visited = new Set();
  let maxHeight = 0;
  let result = 0;

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (row > 0 && col > 0 && row !== m - 1 && col !== n - 1) continue;
      queue.enqueue({ height: heightMap[row][col], row, col });
      visited.add(`${row},${col}`);
    }
  }
  while (queue.size()) {
    const cell = queue.dequeue().element;

    maxHeight = Math.max(cell.height, maxHeight);

    for (const [moveRow, moveCol] of directions) {
      const row = cell.row + moveRow;
      const col = cell.col + moveCol;
      const key = `${row},${col}`;

      if (row < 0 || col < 0 || row >= m || col >= n) continue;
      if (visited.has(key)) continue;
      const height = heightMap[row][col];

      visited.add(key);
      result += Math.max(0, maxHeight - height);
      queue.enqueue({ height, row, col });
    }
  }
  return result;
};
