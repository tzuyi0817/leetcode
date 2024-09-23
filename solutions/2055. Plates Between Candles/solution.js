/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {number[]}
 */
var platesBetweenCandles = function(s, queries) {
    const PLATE = '*';
    const prefixCandles = [];
    const findCandle = (left, right, target) => {
        while (left < right) {
            const middle = Math.floor((left + right) / 2);

            prefixCandles[middle] >= target ? right = middle : left = middle + 1;
        }
        return prefixCandles[left] === target ? left : -1;
    };

    for (let index = 0; index < s.length; index++) {
        const previous = prefixCandles[index - 1] ?? 0;

        prefixCandles[index] = s[index] === PLATE ? previous : previous + 1;
    }
    return queries.map(([left, right]) => {
        const leftCandle = s[left] === PLATE ? findCandle(left, right, prefixCandles[left] + 1) : left;

        if (leftCandle === -1) return 0;
        const rightCandle = s[right] === PLATE ? findCandle(left, right, prefixCandles[right]) : right;

        if (rightCandle === -1) return 0;
        const candles = prefixCandles[rightCandle] - prefixCandles[leftCandle] + 1;

        return rightCandle - leftCandle + 1 - candles;
    });
};