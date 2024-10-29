/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isRationalEqual = function (s, t) {
  const transformRational = str => {
    const EFFECTIVE_ACCURACY = 17;
    const n = str.length;
    const isDecimal = str.includes('.');
    const repeatingStart = str.indexOf('(');
    const isHasRepeating = repeatingStart !== -1;
    const nonRepeatingPart = str.slice(0, isHasRepeating ? repeatingStart : n);
    const repeatingPart = isHasRepeating ? str.slice(repeatingStart + 1, -1) : '0';
    const repeatCount = isDecimal ? EFFECTIVE_ACCURACY : 0;

    return Number.parseFloat(`${nonRepeatingPart}${repeatingPart.repeat(repeatCount)}`);
  };

  return transformRational(s) === transformRational(t);
};
