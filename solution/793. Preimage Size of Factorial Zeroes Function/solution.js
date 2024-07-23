/**
 * @param {number} k
 * @return {number}
 */
var preimageSizeFZF = function(k) {
    let left = 0;
    let right = (k + 1) * 5;

    const getZeroesCount = (num) => {
        let result = 0;

        while (num) {
            num = Math.floor(num / 5);
            result += num;
        }
        return result;
    };

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        const count = getZeroesCount(mid);

        if (count === k) return 5;
        count > k ? right = mid : left = mid + 1;
    }
    return 0;
};