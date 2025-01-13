/**
 * @param {string} s
 * @return {number}
 */
const minimumLength = function (s) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const n = s.length;
  const counts = Array.from({ length: 26 }, () => 0);
  let result = n;

  for (const letter of s) {
    const code = letter.charCodeAt(0) - BASE_CODE;

    counts[code] += 1;

    if (counts[code] < 3) continue;

    counts[code] = 1;
    result -= 2;
  }
  return result;
};
