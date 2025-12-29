/**
 * @param {string} bottom
 * @param {string[]} allowed
 * @return {boolean}
 */
const pyramidTransition = function (bottom, allowed) {
  const allowedMap = new Map();
  const memo = new Map();

  for (const allow of allowed) {
    const block = allow.slice(0, 2);
    const top = allow[2];

    if (!allowedMap.has(block)) {
      allowedMap.set(block, new Set());
    }

    allowedMap.get(block).add(top);
  }

  const getNextRow = row => {
    if (row.length === 1) return true;
    if (memo.has(row)) return memo.get(row);

    const nextRow = [];

    const isValid = index => {
      if (index >= row.length) {
        return getNextRow(nextRow.join(''));
      }

      const block = `${row[index - 1]}${row[index]}`;
      const tops = allowedMap.get(block) ?? [];

      for (const top of tops) {
        nextRow.push(top);

        if (isValid(index + 1)) {
          return true;
        }

        nextRow.pop();
      }

      return false;
    };

    const result = isValid(1);

    memo.set(row, result);

    return result;
  };

  return getNextRow(bottom);
};
