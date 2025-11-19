/**
 * @param {string} s
 * @return {string}
 */
const shortestPalindrome = function (s) {
  const n = s.length;
  const reverseS = s.split('').toReversed().join('');

  for (let index = 0; index < n; index++) {
    const sliceReverseS = reverseS.slice(index);
    const sliceS = s.slice(0, n - index);

    if (sliceReverseS !== sliceS) continue;
    return `${reverseS.slice(0, index)}${s}`;
  }
  return s;
};
