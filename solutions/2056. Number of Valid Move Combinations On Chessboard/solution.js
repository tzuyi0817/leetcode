/**
 * @param {string[]} pieces
 * @param {number[][]} positions
 * @return {number}
 */
const countCombinations = function (pieces, positions) {
  const n = pieces.length;
  const movePaths = [];
  const combinations = new Set();
  const moveMap = {
    rook: [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ],
    queen: [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ],
    bishop: [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ],
  };

  const getMovePath = (index, path) => {
    if (index >= n) {
      movePaths.push([...path]);
      return;
    }

    const piece = pieces[index];

    for (const move of moveMap[piece]) {
      path.push(move);
      getMovePath(index + 1, path);
      path.pop();
    }
  };

  getMovePath(0, []);

  const isValid = combination => {
    const positionSet = new Set();

    for (const [row, col] of combination) {
      if (row <= 0 || col <= 0 || row > 8 || col > 8) return false;

      const position = `${row},${col}`;

      if (positionSet.has(position)) return false;

      positionSet.add(position);
    }

    return true;
  };

  const getCombinations = (combination, path, activeMask) => {
    combinations.add(combination.join('-'));

    for (let nextMask = 1; nextMask < 1 << n; nextMask++) {
      if ((nextMask & activeMask) !== nextMask) continue;

      const nextCombination = combination.map(pos => [...pos]);

      for (let index = 0; index < n; index++) {
        if (!(nextMask & (1 << index))) continue;

        nextCombination[index][0] += path[index][0];
        nextCombination[index][1] += path[index][1];
      }

      if (isValid(nextCombination)) {
        getCombinations(nextCombination, path, nextMask);
      }
    }
  };

  for (const path of movePaths) {
    const combination = positions.map(pos => [...pos]);

    getCombinations(combination, path, (1 << n) - 1);
  }

  return combinations.size;
};
