/**
 * @param {string} s
 * @return {string}
 */
const smallestPalindrome = function (s) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const counts = Array.from({ length: 26 }, () => 0);
  let prefix = '';
  let suffix = '';
  let middle = '';

  for (const char of s) {
    const code = char.charCodeAt(0) - BASE_CODE;

    counts[code] += 1;
  }

  for (let code = 0; code < 26; code++) {
    const count = counts[code];

    if (!count) continue;

    const char = String.fromCharCode(code + BASE_CODE);
    const half = Math.floor(count / 2);
    const target = char.repeat(half);

    if (count % 2) {
      middle = char;
    }

    prefix += target;
    suffix = `${target}${suffix}`;
  }

  return `${prefix}${middle}${suffix}`;
};
