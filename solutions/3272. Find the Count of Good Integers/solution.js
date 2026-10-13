/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
const countGoodIntegers = function (n, k) {
  const half = Math.ceil(n / 2);
  const minHalf = 10 ** (half - 1);
  const maxHalf = 10 ** half;
  const seen = new Set();
  let result = 0;

  for (let num = minHalf; num < maxHalf; num++) {
    const prefix = String(num);
    const temp = [...prefix];

    if (n % 2) {
      temp.pop();
    }

    const suffix = temp.toReversed().join('');
    const palindromic = `${prefix}${suffix}`;

    if (Number(palindromic) % k) continue;

    const counts = getCounts(palindromic);
    const key = counts.join('-');

    if (seen.has(key)) continue;

    seen.add(key);

    let permutations = (n - counts[0]) * factorial(n - 1);

    for (const count of counts) {
      if (count > 1) {
        permutations /= factorial(count);
      }
    }

    result += permutations;
  }

  return result;
};

function getCounts(str) {
  const counts = new Array(10).fill(0);

  for (const char of str) {
    const digit = Number(char);

    counts[digit] += 1;
  }

  return counts;
}

function factorial(n) {
  let result = 1;

  for (let index = 2; index <= n; index++) {
    result *= index;
  }

  return result;
}
