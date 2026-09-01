/**
 * @param {string[]} classroom
 * @param {number} energy
 * @return {number}
 */
const minMoves = function (classroom, energy) {
  const m = classroom.length;
  const n = classroom[0].length;
  const letterMap = new Map();
  let letter = 0;
  let queue = [];

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = classroom[row][col];

      if (value === 'S') {
        queue.push({ row, col, energy, mask: 0 });
      } else if (value === 'L') {
        const key = `${row},${col}`;

        letterMap.set(key, letter);
        letter += 1;
      }
    }
  }

  if (letter === 0) return 0;

  const visitMap = new Map();
  const maxMask = (1 << letter) - 1;
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  let step = 0;

  while (queue.length) {
    const nextQueue = [];

    for (const { row, col, energy: e, mask } of queue) {
      const value = classroom[row][col];
      const letterKey = `${row},${col}`;
      let nextMask = mask;
      let nextEnergy = value === 'R' ? energy : e;

      if (letterMap.has(letterKey)) {
        const index = letterMap.get(letterKey);

        nextMask |= 1 << index;

        if (nextMask === maxMask) return step;
      }

      if (nextEnergy === 0) continue;

      nextEnergy -= 1;

      for (const [moveRow, moveCol] of directions) {
        const nextRow = row + moveRow;
        const nextCol = col + moveCol;

        if (nextRow < 0 || nextCol < 0 || nextRow >= m || nextCol >= n) continue;
        if (classroom[nextRow][nextCol] === 'X') continue;

        const key = `${nextRow},${nextCol},${nextMask}`;

        if (visitMap.get(key) >= nextEnergy) continue;

        visitMap.set(key, nextEnergy);
        nextQueue.push({
          row: nextRow,
          col: nextCol,
          mask: nextMask,
          energy: nextEnergy,
        });
      }
    }

    queue = nextQueue;
    step += 1;
  }

  return -1;
};
