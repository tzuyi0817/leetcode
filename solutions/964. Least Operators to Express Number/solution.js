/**
 * @param {number} x
 * @param {number} target
 * @return {number}
 */
var leastOpsExpressTarget = function(x, target) {
    const memo = {};

    const getOperatorsCount = (value) => {
        if (memo[value]) return memo[value];
        if (value === x) return 0;
        if (value < x) {
            const addCount = value * 2 - 1;
            const subCount = (x - value) * 2;

            return Math.min(addCount, subCount);
        }
        let count = 0;
        let current = x;

        while (current < value) {
            current *= x;
            count += 1;
        }
        if (current === value) return memo[value] = count;

        const overflow = current - value;
        const addCount = getOperatorsCount(value - (current / x)) + count - 1;

        if (overflow < value) {
            const subCount = getOperatorsCount(overflow) + count;

            return memo[value] = Math.min(subCount, addCount) + 1;
        }
        return memo[value] = addCount + 1;
    };

    return getOperatorsCount(target);
};