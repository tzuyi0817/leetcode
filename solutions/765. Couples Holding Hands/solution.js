/**
 * @param {number[]} row
 * @return {number}
 */
var minSwapsCouples = function(row) {
    const n = row.length;
    const peoples = [];
    let result = 0;

    for (let index = 0; index < n; index++) {
        const people = row[index];

        peoples[people] = index;
    }
    
    for (let index = 1; index < n; index += 2) {
        const current = row[index];
        const couple = row[index - 1];
        const target = couple % 2 ? couple - 1 : couple + 1;

        if (current === target) continue;
        const swapIndex = peoples[target];

        peoples[target] = index;
        peoples[current] = swapIndex;
        [row[index], row[swapIndex]] = [row[swapIndex], row[index]];
        result += 1;
    }
    return result;
};