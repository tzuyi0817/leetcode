/**
 * @param {number} left
 * @param {number} right
 * @return {string}
 */
const abbreviateProduct = function (left, right) {
  const maxSuf = 100_000_000_000;
  let prod = 1;
  let suf = 1;
  let countDigits = 0;
  let countZeros = 0;

  for (let num = left; num <= right; num++) {
    prod *= num;

    while (prod >= 1) {
      prod /= 10;
      countDigits += 1;
    }

    suf *= num;

    while (suf % 10 === 0) {
      suf /= 10;
      countZeros += 1;
    }

    if (suf > maxSuf) {
      suf %= maxSuf;
    }
  }

  if (countDigits - countZeros <= 10) {
    const tens = 10 ** (countDigits - countZeros);

    return `${Math.round(prod * tens)}e${countZeros}`;
  }

  const pre = Math.floor(prod * 1e5);
  const sufStr = suf.toString().slice(-5);

  return `${pre}...${sufStr}e${countZeros}`;
};
