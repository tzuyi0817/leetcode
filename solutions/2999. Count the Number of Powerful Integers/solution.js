/**
 * @param {number} start
 * @param {number} finish
 * @param {number} limit
 * @param {string} s
 * @return {number}
 */
const numberOfPowerfulInt = function (start, finish, limit, s) {
  const a = `${start}`;
  const b = `${finish}`;
  const aWithLeadingZeros = '0'.repeat(b.length - a.length) + a;
  const mem = Array.from({ length: b.length }, () => {
    return new Array(2).fill('').map(() => new Array(2).fill(-1));
  });

  function count(a, i, tight1, tight2) {
    if (i + s.length === b.length) {
      const aMinSuffix = tight1 ? a.slice(-s.length) : '0'.repeat(s.length);
      const bMaxSuffix = tight2 ? b.slice(-s.length) : '9'.repeat(s.length);
      const suffix = Number(s);

      return Number(aMinSuffix) <= suffix && suffix <= Number(bMaxSuffix) ? 1 : 0;
    }

    if (mem[i][tight1 ? 1 : 0][tight2 ? 1 : 0] !== -1) {
      return mem[i][tight1 ? 1 : 0][tight2 ? 1 : 0];
    }

    const minDigit = tight1 ? Number(a[i]) : 0;
    const maxDigit = tight2 ? Number(b[i]) : 9;
    let res = 0;

    for (let d = minDigit; d <= maxDigit; d++) {
      if (d > limit) continue;
      const nextTight1 = tight1 && d === minDigit;
      const nextTight2 = tight2 && d === maxDigit;

      res += count(a, i + 1, nextTight1, nextTight2);
    }

    mem[i][tight1 ? 1 : 0][tight2 ? 1 : 0] = res;

    return res;
  }

  return count(aWithLeadingZeros, 0, true, true);
};
