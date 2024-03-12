/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {number[]}
 */
var platesBetweenCandles = function(s, queries) {
    const CANDLE = '*';
    const prefixPlates = [];
    const findPlate = (left, right, target) => {
        while (left < right) {
            const middle = Math.floor((left + right) / 2);

            prefixPlates[middle] >= target ? right = middle : left = middle + 1;
        }
        return s[left] === CANDLE ? -1 : left;
    };

    for (let index = 0; index < s.length; index++) {
        const previousPlates = prefixPlates[index - 1] ?? 0;

        prefixPlates[index] = previousPlates + (s[index] === CANDLE ? 0 : 1);
    }
    return queries.map(([left, right]) => {
        const leftPlate = s[left] === CANDLE ? findPlate(left, right, prefixPlates[left] + 1) : left;

        if (leftPlate === -1) return 0;
        const rightPlate = s[right] === CANDLE ? findPlate(left, right, prefixPlates[right]) : right;

        if (rightPlate === -1) return 0;
        const plates = prefixPlates[rightPlate] - prefixPlates[leftPlate] + 1;

        return rightPlate - leftPlate + 1 - plates;
    });
};