/**
 * @param {number} n
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
const zigZagArrays = function (n, l, r) {
  const MODULO = 10 ** 9 + 7;
  const incDp = Array.from({ length: r + 1 }, () => 0);
  const decDp = Array.from({ length: r + 1 }, () => 0);
  const incSum = Array.from({ length: r + 1 }, () => 0);
  const decSum = Array.from({ length: r + 1 }, () => 0);

  for (let index = l; index <= r; index++) {
    const len = index - l + 1;

    incDp[index] = 1;
    decDp[index] = 1;
    incSum[index] = len;
    decSum[index] = len;
  }

  let len = 1;

  while (len < n) {
    for (let index = l; index <= r; index++) {
      incDp[index] = (decSum[r] - decSum[index] + MODULO) % MODULO;
      decDp[index] = incSum[index - 1];
    }

    incSum[l] = incDp[l];
    decSum[l] = decDp[l];

    for (let index = l + 1; index <= r; index++) {
      incSum[index] = (incSum[index - 1] + incDp[index]) % MODULO;
      decSum[index] = (decSum[index - 1] + decDp[index]) % MODULO;
    }

    len += 1;
  }

  return (incSum[r] + decSum[r]) % MODULO;
};
