/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {string}
 */
const longestDiverseString = function (a, b, c) {
  const n = a + b + c;
  let result = '';
  let repeat = 1;

  const checkRepeat = (count, previous, target) => {
    return repeat === 2 && count && previous !== target;
  };

  for (let index = 0; index < n; index++) {
    const previous = result[index - 1];

    if ((a && a >= b && a >= c && repeat < 2) || checkRepeat(a, previous, 'a')) {
      result += 'a';
      a -= 1;
    } else if ((b && b >= a && b >= c && repeat < 2) || checkRepeat(b, previous, 'b')) {
      result += 'b';
      b -= 1;
    } else if ((c && c >= a && c >= b && repeat < 2) || checkRepeat(c, previous, 'c')) {
      result += 'c';
      c -= 1;
    }

    if (!result[index]) return result;

    repeat = result[index] === previous ? repeat + 1 : 1;
  }
  return result;
};
