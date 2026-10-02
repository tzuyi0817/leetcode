/**
 * @param {number[][]} board
 * @return {number}
 */
const maximumValueSum = function (board) {
  const m = board.length;
  const n = board[0].length;
  const prefixTop3 = Array.from({ length: m + 1 }, () => []);
  const suffixTop3 = Array.from({ length: m + 1 }, () => []);

  const updateTop3 = (top3, col, value) => {
    const index = top3.findIndex(top => top.col === col);

    if (index === -1) {
      top3.push({ col, value });
    } else {
      if (top3[index].value < value) {
        top3[index] = { col, value };
      }
    }

    top3.sort((a, b) => b.value - a.value);

    return top3.slice(0, 3);
  };

  for (let row = 1; row <= m; row++) {
    const prevTop3 = prefixTop3[row - 1];
    let top3 = [...prevTop3];

    for (let col = 0; col < n; col++) {
      const value = board[row - 1][col];

      top3 = updateTop3(top3, col, value);
    }

    prefixTop3[row] = top3;
  }

  for (let row = m - 1; row >= 0; row--) {
    const prevTop3 = suffixTop3[row + 1];
    let top3 = [...prevTop3];

    for (let col = 0; col < n; col++) {
      const value = board[row][col];

      top3 = updateTop3(top3, col, value);
    }

    suffixTop3[row] = top3;
  }

  let result = Number.MIN_SAFE_INTEGER;

  for (let row = 0; row < m; row++) {
    const prefix = prefixTop3[row];
    const suffix = suffixTop3[row + 1];

    for (let col = 0; col < n; col++) {
      const value = board[row][col];

      for (const { value: v1, col: c1 } of prefix) {
        if (c1 === col) continue;

        for (const { value: v2, col: c2 } of suffix) {
          if (c1 === c2 || c2 === col) continue;

          const sum = value + v1 + v2;

          result = Math.max(sum, result);
        }
      }
    }
  }

  return result;
};
