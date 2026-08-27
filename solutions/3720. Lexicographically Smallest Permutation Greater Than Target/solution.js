/**
 * @param {string} s
 * @param {string} target
 * @return {string}
 */
const lexGreaterPermutation = function (s, target) {
  const n = target.length;
  const BASE_CODE = 'a'.charCodeAt(0);
  const originCounts = Array.from({ length: 26 }, () => 0);

  for (const char of s) {
    const code = char.charCodeAt(0) - BASE_CODE;

    originCounts[code] += 1;
  }

  const getPossibleCounts = end => {
    const counts = [...originCounts];

    for (let index = 0; index < end; index++) {
      const code = target[index].charCodeAt(0) - BASE_CODE;

      counts[code] -= 1;

      if (counts[code] < 0) return null;
    }

    return counts;
  };

  const getBiggerCode = (counts, targetCode) => {
    for (let code = targetCode + 1; code < 26; code++) {
      if (!counts[code]) continue;

      return code;
    }

    return -1;
  };

  for (let index = n - 1; index >= 0; index--) {
    const counts = getPossibleCounts(index);

    if (!counts) continue;

    const code = target[index].charCodeAt(0) - BASE_CODE;
    const biggerCode = getBiggerCode(counts, code);

    if (biggerCode === -1) continue;

    const biggerChar = String.fromCharCode(biggerCode + BASE_CODE);
    const prefix = `${target.slice(0, index)}${biggerChar}`;
    let suffix = '';

    counts[biggerCode] -= 1;

    for (let code = 0; code < 26; code++) {
      const count = counts[code];

      if (!count) continue;

      const char = String.fromCharCode(code + BASE_CODE);

      suffix += char.repeat(count);
    }

    return `${prefix}${suffix}`;
  }

  return '';
};
