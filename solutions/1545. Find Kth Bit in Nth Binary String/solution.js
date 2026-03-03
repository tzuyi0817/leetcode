/**
 * @param {number} n
 * @param {number} k
 * @return {character}
 */
const findKthBit = function (n, k) {
  if (k === 1) return '0';

  const len = (1 << n) - 1;
  const middle = (len + 1) / 2;

  if (k === middle) return '1';

  if (k > middle) {
    return findKthBit(n - 1, len - k + 1) === '0' ? '1' : '0';
  }

  return findKthBit(n - 1, k);
};
