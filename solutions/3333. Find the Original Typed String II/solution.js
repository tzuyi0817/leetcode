/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
const possibleStringCount = function (word, k) {
  const MODULO = BigInt(10 ** 9 + 7);
  const n = word.length;
  const groups = [];
  let group = 1n;

  for (let index = 1; index <= n; index++) {
    if (word[index] === word[index - 1]) {
      group += 1n;
    } else {
      groups.push(group);
      group = 1n;
    }
  }

  const combinations = groups.reduce((total, group) => (total * group) % MODULO, 1n);

  if (groups.length >= k) return Number(combinations);

  let dp = Array.from({ length: k + 1 }, () => 0n);

  dp[1] = 1n;

  for (const [index, group_] of groups.entries()) {
    const nextDp = new Array(k + 1).fill(0n);
    const group = Number(group_);
    let sumCount = 0n;

    for (let len = index + 1; len <= k; len++) {
      nextDp[len] = (nextDp[len] + sumCount) % MODULO;
      sumCount = (sumCount + dp[len]) % MODULO;

      if (len > group) {
        const overCount = dp[len - group];

        sumCount = (sumCount - overCount + MODULO) % MODULO;
      }
    }

    dp = nextDp;
  }

  const invalidCombinations = dp.reduce((total, count) => (total + count) % MODULO);

  return Number((combinations - invalidCombinations + MODULO) % MODULO);
};
