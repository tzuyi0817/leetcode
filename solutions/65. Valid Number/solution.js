/**
 * @param {string} s
 * @return {boolean}
 */
const isNumber = function (s) {
  let seenNumber = (seenDot = seenE = false);

  for (let index = 0; index < s.length; index++) {
    const char = s[index];

    if (Number.isInteger(+char)) {
      seenNumber = true;
    } else if (char === '.') {
      if (seenDot || seenE) return false;
      seenDot = true;
    } else if (/e/i.test(char)) {
      if (seenE || !seenNumber) return false;
      seenE = true;
      seenNumber = false;
    } else if (/[+-]/.test(char)) {
      if (index === 0) continue;
      if (s[index - 1].toLowerCase() !== 'e') return false;
    } else {
      return false;
    }
  }
  return seenNumber;
};
