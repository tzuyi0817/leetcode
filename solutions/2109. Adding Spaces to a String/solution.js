/**
 * @param {string} s
 * @param {number[]} spaces
 * @return {string}
 */
var addSpaces = function (s, spaces) {
  const n = s.length;
  const result = [];
  let spacesIndex = 0;

  for (let index = 0; index < n; index++) {
    if (index === spaces[spacesIndex]) {
      result.push(' ');
      spacesIndex += 1;
    }
    result.push(s[index]);
  }
  return result.join('');
};
