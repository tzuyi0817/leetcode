/**
 * @param {number} n
 * @param {number} k
 * @return {character}
 */
var findKthBit = function(n, k) {
    if (n === 1) return '0';
    const size = 2 ** n - 1;
    const mid = (size + 1) / 2;

    if (mid === k) return '1';
    if (mid < k) {
        return findKthBit(n - 1, size - k + 1) === '0' ? '1' : '0';
    }
    return findKthBit(n - 1, k);
};
