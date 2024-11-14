/**
 * @param {string} s
 * @return {string}
 */
const lastSubstring = function (s) {
  const n = s.length;
  let a = 0;
  let b = 1;
  let length = 1;

  while (b + length <= n) {
    const letterA = s[a + length - 1];
    const letterB = s[b + length - 1];

    if (letterA === letterB) length += 1;
    else if (letterA < letterB) {
      a = Math.max(a + length, b);
      b = a + 1;
      length = 1;
    } else {
      b += length;
      length = 1;
    }
  }
  return s.slice(a);
};
