/**
 * @param {number} n
 * @param {number} t
 * @return {number}
 */
const smallestNumber = function (n, t) {
  let current = n;
  let product = 1;

  while (current) {
    product *= current % 10;
    current = Math.floor(current / 10);
  }

  if (product % t === 0) return n;

  const base = Math.floor(n / 10) * 10;
  const lastDigit = n % 10;

  for (let num = lastDigit + 1; num <= 9; num++) {
    product = (product / (num - 1)) * num;

    if (product % t === 0) {
      return base + num;
    }
  }

  return base + 10;
};
