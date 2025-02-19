/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
const getHappyString = function (n, k) {
  const perCounts = Math.pow(2, n - 1);
  const totalCounts = 3 * perCounts;

  if (k > totalCounts) return '';
  const letters = ['a', 'b', 'c'];
  const happyStr = Array.from({ length: n }, () => '');

  const kthHappyString = index => {
    if (index >= n) {
      k -= 1;
      return k ? '' : happyStr.join('');
    }

    for (const letter of letters) {
      if (happyStr[index - 1] === letter) continue;

      happyStr[index] = letter;
      const result = kthHappyString(index + 1);

      if (result) return result;
    }

    return '';
  };

  return kthHappyString(0);
};
