/**
 * @param {string} s
 * @return {string}
 */
const makeFancyString = function (s) {
  const n = s.length;
  const result = [];
  let consecutive = 1;

  for (let index = 0; index < n; index++) {
    const char = s[index];

    if (char === s[index - 1]) {
      if (consecutive === 2) continue;

      consecutive += 1;
    } else {
      consecutive = 1;
    }

    result.push(char);
  }

  return result.join('');
};
