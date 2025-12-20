/**
 * @param {string[]} strs
 * @return {number}
 */
const minDeletionSize = function (strs) {
  const m = strs.length;
  const n = strs[0].length;
  let result = 0;

  const isStoredCol = col => {
    for (let row = 1; row < m; row++) {
      if (strs[row][col] < strs[row - 1][col]) {
        return false;
      }
    }

    return true;
  };

  for (let col = 0; col < n; col++) {
    if (!isStoredCol(col)) {
      result += 1;
    }
  }

  return result;
};
