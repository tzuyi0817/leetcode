/**
 * @param {number} lo
 * @param {number} hi
 * @param {number} k
 * @return {number}
 */

var getKth = function(lo, hi, k) {
    const powersMap = new Map([[1, 0]]);
    const powers = [];
    const getPower = (value) => {
        if (powersMap.has(value)) return powersMap.get(value);
        const isOdd = value % 2;
        const nextValue = isOdd ? 3 * value + 1 : value / 2;
        const power = getPower(nextValue) + 1;

        powersMap.set(value, power);
        return power;
    };

    for (let value = lo; value <= hi; value++) {
        const power = getPower(value);

        powers.push({ value, power });
    }
    powers.sort((a, b) => a.power - b.power);
    return powers[k - 1].value;
};
