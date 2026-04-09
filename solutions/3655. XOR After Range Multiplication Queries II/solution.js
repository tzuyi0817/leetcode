/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */
const xorAfterQueries = function (nums, queries) {
  const MODULO = BigInt(10 ** 9 + 7);
  const n = nums.length;
  const sqrtN = Math.floor(Math.sqrt(n));
  const groups = Array.from({ length: sqrtN }, () => []);
  const diffs = new BigInt64Array(n + sqrtN);

  for (const [l, r, k, v] of queries) {
    if (k < sqrtN) {
      groups[k].push({ l, r, v: BigInt(v) });
      continue;
    }

    for (let index = l; index <= r; index += k) {
      const num = BigInt(nums[index]);

      nums[index] = Number((num * BigInt(v)) % MODULO);
    }
  }

  const pow = (base, exp) => {
    let result = 1n;

    while (exp) {
      if (exp % 2n) {
        result = (result * base) % MODULO;
      }

      base = (base * base) % MODULO;
      exp /= 2n;
    }

    return result;
  };

  for (let k = 1; k < sqrtN; k++) {
    if (!groups.length) continue;

    diffs.fill(1n);

    for (const { l, r, v } of groups[k]) {
      const R = Math.floor((r - l) / k + 1) * k + l;

      diffs[l] = (diffs[l] * v) % MODULO;
      diffs[R] = (diffs[R] * pow(v, MODULO - 2n)) % MODULO;
    }

    for (let index = k; index < n; index++) {
      diffs[index] = (diffs[index] * diffs[index - k]) % MODULO;
    }

    for (let index = 0; index < n; index++) {
      const num = BigInt(nums[index]);

      nums[index] = Number((num * diffs[index]) % MODULO);
    }
  }

  return nums.reduce((result, num) => result ^ num);
};
