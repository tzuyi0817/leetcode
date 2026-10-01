/**
 * @param {number[][]} board
 * @return {number}
 */
const maximumValueSum = function (board) {
  const m = board.length;

  const candidates = board.map(row => {
    const coledRow = row.map((value, col) => ({ value, col }));

    coledRow.sort((a, b) => b.value - a.value);

    return coledRow.slice(0, 3);
  });

  const memo = new Map();

  const getPlacingValue = (row, c1, c2) => {
    if (row >= m) return Number.MIN_SAFE_INTEGER;

    const key = `${row},${c1},${c2}`;

    if (memo.has(key)) return memo.get(key);

    let result = getPlacingValue(row + 1, c1, c2);

    for (const { value, col } of candidates[row]) {
      if (col === c1 || col === c2) continue;

      if (c1 === -1) {
        const total = value + getPlacingValue(row + 1, col, c2);

        result = Math.max(total, result);
      } else if (c2 === -1) {
        const total = value + getPlacingValue(row + 1, c1, col);

        result = Math.max(total, result);
      } else {
        result = Math.max(value, result);
      }
    }

    memo.set(key, result);

    return result;
  };

  return getPlacingValue(0, -1, -1);
};
