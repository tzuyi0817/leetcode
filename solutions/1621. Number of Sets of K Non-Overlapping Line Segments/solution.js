/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
const numberOfSets = function (n, k) {
  const MODULO = 10 ** 9 + 7;
  let noLine = Array.from({ length: n }, () => 1);
  let inLine = Array.from({ length: n }, () => 0);

  for (let segment = 1; segment <= k; segment++) {
    const nextNoLine = new Array(n).fill(0);
    const nextInLine = new Array(n).fill(0);

    for (let index = 1; index < n; index++) {
      const prevTotal = (noLine[index - 1] + inLine[index - 1]) % MODULO;

      nextInLine[index] = (nextInLine[index - 1] + prevTotal) % MODULO;
      nextNoLine[index] = (nextNoLine[index - 1] + nextInLine[index - 1]) % MODULO;
    }

    noLine = nextNoLine;
    inLine = nextInLine;
  }

  return (noLine[n - 1] + inLine[n - 1]) % MODULO;
};
