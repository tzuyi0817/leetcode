/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
const getHappyString = function (n, k) {
  const LETTERS = ['a', 'b', 'c'];
  const backtracking = current => {
    if (current.length === n) {
      k -= 1;
      return k ? '' : current;
    }
    for (let index = 0; index < LETTERS.length; index++) {
      const char = LETTERS[index];
      if (current.at(-1) === char) continue;
      const value = backtracking(current + char);

      if (value) return value;
    }
    return '';
  };

  return backtracking('');
};
