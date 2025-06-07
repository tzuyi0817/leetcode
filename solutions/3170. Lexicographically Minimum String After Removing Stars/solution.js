/**
 * @param {string} s
 * @return {string}
 */
const clearStars = function (s) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const n = s.length;
  const letters = Array.from({ length: 26 }, () => []);
  const result = s.split('');

  for (let index = 0; index < n; index++) {
    const current = s[index];

    if (current === '*') {
      const indices = letters.find(indices => indices.length);
      const deleteIndex = indices.pop();

      result[index] = '';
      result[deleteIndex] = '';
    } else {
      const code = current.charCodeAt(0) - BASE_CODE;

      letters[code].push(index);
    }
  }

  return result.join('');
};
