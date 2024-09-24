/**
 * @param {string} s
 * @return {string}
 */
const makeLargestSpecial = function (s) {
  const result = [];
  let left = 0;
  let current = 0;

  for (let index = 0; index < s.length; index++) {
    current += s[index] === '1' ? 1 : -1;

    if (current) continue;
    const subStr = s.slice(left + 1, index);

    result.push(`1${makeLargestSpecial(subStr)}0`);
    left = index + 1;
  }
  result.sort((a, b) => b.localeCompare(a));

  return result.join('');
};
