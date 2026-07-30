/**
 * @param {string} word
 * @return {number}
 */
const minimumPushes = function (word) {
  const n = word.length;
  const KEYPADS = 8;
  const fullPushes = Math.floor(n / KEYPADS);
  const times = ((1 + fullPushes) * fullPushes) / 2;

  return KEYPADS * times + (n % KEYPADS) * (fullPushes + 1);
};
