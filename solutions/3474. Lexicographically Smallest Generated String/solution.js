/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
const generateString = function (str1, str2) {
  const n = str1.length;
  const m = str2.length;
  const chars = Array.from({ length: n + m - 1 }, () => 'a');
  const fixed = Array.from({ length: n + m - 1 }, () => false);

  for (let a = 0; a < n; a++) {
    if (str1[a] !== 'T') continue;

    for (let b = a; b < a + m; b++) {
      const target = str2[b - a];

      if (target !== chars[b] && fixed[b]) return '';

      fixed[b] = true;
      chars[b] = target;
    }
  }

  for (let a = 0; a < n; a++) {
    if (str1[a] !== 'F') continue;

    let isValid = false;
    let index = -1;

    for (let b = a + m - 1; b >= a; b--) {
      const target = str2[b - a];

      if (target !== chars[b]) {
        isValid = true;
        break;
      }

      if (index === -1 && !fixed[b]) {
        index = b;
      }
    }

    if (isValid) continue;

    if (index === -1) return '';

    fixed[index] = true;
    chars[index] = 'b';
  }

  return chars.join('');
};
