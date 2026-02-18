/**
 * @param {number} n
 * @return {boolean}
 */
const hasAlternatingBits = function (n) {
  let prev = -1;

  while (n) {
    const current = n & 1;

    if (current === prev) return false;

    n >>= 1;
    prev = current;
  }

  return true;
};
