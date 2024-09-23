/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var findKthNumber = function(n, k) {
    let current = 1;

    const getGap = (left, right) => {
        let gap = 0;

        while (left <= n) {
            gap += Math.min(n + 1, right) - left;
            left *= 10;
            right *= 10;
        }
        return gap;
    };

    k -= 1;

    while (k) {
        const gap = getGap(current, current + 1);

        if (gap <= k) {
            k -= gap;
            current += 1;
            continue;
        }
        current *= 10;
        k -= 1;
    }
    return current;
};