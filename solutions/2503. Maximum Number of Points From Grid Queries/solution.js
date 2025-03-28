/**
 * @param {number[][]} grid
 * @param {number[]} queries
 * @return {number[]}
 */
const maxPoints = function (grid, queries) {
  const m = grid.length;
  const n = grid[0].length;
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const visited = Array.from({ length: m }, () => new Array(n).fill(false));
  const minHeap = new MinPriorityQueue(({ val }) => val);
  const indexdQueries = queries.map((query, index) => ({ query, index }));
  const result = Array.from({ length: queries.length }, () => 0);
  let cells = 0;

  minHeap.enqueue({ val: grid[0][0], row: 0, col: 0 });
  visited[0][0] = true;
  indexdQueries.sort((a, b) => a.query - b.query);

  const getCells = query => {
    while (minHeap.size()) {
      const element = minHeap.front();

      if (element.val >= query) return cells;
      const { row, col } = minHeap.dequeue();

      cells += 1;

      for (const [moveRow, moveCol] of directions) {
        const nextRow = row + moveRow;
        const nextCol = col + moveCol;

        if (nextRow < 0 || nextCol < 0 || nextRow >= m || nextCol >= n) continue;
        if (visited[nextRow][nextCol]) continue;

        visited[nextRow][nextCol] = true;
        minHeap.enqueue({ row: nextRow, col: nextCol, val: grid[nextRow][nextCol] });
      }
    }

    return cells;
  };

  for (const { query, index } of indexdQueries) {
    result[index] = getCells(query);
  }

  return result;
};
