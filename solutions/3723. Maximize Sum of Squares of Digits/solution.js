/**
 * @param {number} num
 * @param {number} sum
 * @return {string}
 */
const maxSumOfSquares = function (num, sum) {
  if (sum > 9 * num) return '';

  const multiple = Math.floor(sum / 9);
  const remainder = sum % 9;
  const base = '9'.repeat(multiple);

  if (multiple === num) return base;

  return `${base}${remainder}`.padEnd(num, '0');
};
