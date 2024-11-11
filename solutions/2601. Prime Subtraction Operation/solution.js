/**
 * @param {number[]} nums
 * @return {boolean}
 */
var primeSubOperation = function (nums) {
  const n = nums.length;
  const memo = new Map();

  const isPrime = num => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    if (memo.has(num)) return memo.get(num);

    for (let index = 5; index * index <= num; index++) {
      if (num % index === 0) {
        memo.set(num, false);
        return false;
      }
    }
    memo.set(num, true);
    return true;
  };

  const getMinPrime = (start, end) => {
    for (let num = start; num < end; num++) {
      if (isPrime(num)) return num;
    }
    return -1;
  };

  let next = nums[n - 1];

  for (let index = n - 2; index >= 0; index--) {
    const current = nums[index];

    if (current < next) {
      next = current;
      continue;
    }
    const prime = getMinPrime(current - next + 1, current);

    if (prime === -1) return false;

    next = current - prime;
  }
  return true;
};
