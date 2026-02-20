/**
 * @param {string} s
 * @return {string}
 */
const makeLargestSpecial = function (s) {
  const n = s.length;
  const strs = [];
  let current = 0;
  let left = 0;

  for (let index = 0; index < n; index++) {
    current += s[index] === '1' ? 1 : -1;

    if (current) continue;

    const str = s.slice(left + 1, index);
    const swappedStr = makeLargestSpecial(str);

    strs.push(`1${swappedStr}0`);
    left = index + 1;
  }

  strs.sort((a, b) => b.localeCompare(a));

  return strs.join('');
};
