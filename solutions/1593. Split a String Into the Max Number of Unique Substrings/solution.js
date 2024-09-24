/**
 * @param {string} s
 * @return {number}
 */
const maxUniqueSplit = function (s) {
  const size = s.length;
  const uniqueSplit = new Set();
  let result = 0;

  backtracking();
  return result;

  function backtracking(start = 0) {
    if (start === size) {
      result = Math.max(uniqueSplit.size, result);
      return;
    }

    for (let index = start + 1; index <= size; index++) {
      const substring = s.slice(start, index);

      if (uniqueSplit.has(substring)) continue;
      uniqueSplit.add(substring);
      backtracking(index);
      uniqueSplit.delete(substring);
    }
  }
};
