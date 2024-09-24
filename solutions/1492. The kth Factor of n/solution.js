/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
const kthFactor = function (n, k) {
  const factors = [];

  for (let num = 1; num ** 2 <= n; num++) {
    if (n % num) continue;
    const factor = n / num;

    if (factor !== num) factors.push(factor);
    k -= 1;
    if (k === 0) return num;
  }
  return k > factors.length ? -1 : factors.at(-k);
};
