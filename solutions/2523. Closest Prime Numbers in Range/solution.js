/**
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
const closestPrimes = function (left, right) {
  const sieve = new Array(right + 1).fill(true);

  sieve[0] = false;
  sieve[1] = false;

  for (let num = 2; num ** 2 <= right; num++) {
    if (!sieve[num]) continue;

    for (let multNum = num ** 2; multNum <= right; multNum += num) {
      sieve[multNum] = false;
    }
  }

  let result = [-1, -1];
  let prevPrime = -1;
  let minInterval = Number.MAX_SAFE_INTEGER;

  for (let num = left; num <= right; num++) {
    if (!sieve[num]) continue;

    if (prevPrime !== -1 && num - prevPrime < minInterval) {
      minInterval = num - prevPrime;
      result = [prevPrime, num];
    }

    prevPrime = num;
  }

  return result;
};
