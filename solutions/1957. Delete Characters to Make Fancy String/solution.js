/**
 * @param {string} s
 * @return {string}
 */
const makeFancyString = function (s) {
  const n = s.length;
  let repeat = 0;
  let previous = '';
  let result = '';

  for (let index = 0; index < n; index++) {
    const letter = s[index];

    repeat = letter === previous ? repeat + 1 : 1;
    previous = letter;
    if (repeat >= 3) continue;

    result += letter;
  }
  return result;
};
