/**
 * @param {number} n
 * @return {number}
 */
const numOfWays = function (n) {
  const MODULO = 10 ** 9 + 7;
  let colors2 = 6; // 010 020 101 121 202 212
  let colors3 = 6; // 012 021 102 120 201 210

  for (let row = 1; row < n; row++) {
    // 010 -> 101 121 202, 102 201
    const nextColors2 = colors2 * 3 + colors3 * 2;
    // 012 -> 101 121, 120 201
    const nextColors3 = colors2 * 2 + colors3 * 2;

    colors2 = nextColors2 % MODULO;
    colors3 = nextColors3 % MODULO;
  }
  return (colors2 + colors3) % MODULO;
};
