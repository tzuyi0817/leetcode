/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const countKReducibleNumbers = function (s, k) {
  const MODULO = 10 ** 9 + 7;
  const n = s.length;
  const ops = Array.from({ length: n + 1 }, () => 0);
  const dp = Array.from({ length: n }, () => {
    return new Array(2).fill('').map(() => new Array(n + 1).fill(-1));
  });

  for (let num = 2; num <= n; num++) {
    ops[num] = 1 + ops[popcount(num)];
  }

  const getReducibleCount = (index, bits, tight) => {
    if (index === n) {
      return bits && ops[bits] < k && !tight ? 1 : 0;
    }

    const key = Number(tight);

    if (dp[index][key][bits] !== -1) {
      return dp[index][key][bits];
    }

    const current = Number(s[index]);
    const limit = tight ? current : 1;
    let result = 0;

    for (let num = 0; num <= limit; num++) {
      const nextTight = tight && num === current;
      const count = getReducibleCount(index + 1, bits + num, nextTight);

      result = (result + count) % MODULO;
    }

    dp[index][key][bits] = result;

    return result;
  };

  return getReducibleCount(0, 0, true);
};

function popcount(num) {
  let result = 0;

  while (num) {
    num &= num - 1;
    result += 1;
  }

  return result;
}
