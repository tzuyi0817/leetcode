/**
 * @param {number[]} difficulty
 * @param {number[]} profit
 * @param {number[]} worker
 * @return {number}
 */
var maxProfitAssignment = function(difficulty, profit, worker) {
    const n = difficulty.length;
    const difficultyMap = difficulty.reduce((map, difficult, index) => {
        const income = map.get(difficult) ?? 0;

        return map.set(difficult, Math.max(income, profit[index]));
    }, new Map());

    worker.sort((a, b) => a - b);
    difficulty.sort((a, b) => a - b);

    let index = maxIncome = result = 0;

    for (const ability of worker) {
        while (index < n && ability >= difficulty[index]) {
            const income = difficultyMap.get(difficulty[index]);

            maxIncome = Math.max(income, maxIncome);
            index += 1;
        }
        result += maxIncome;
    }
    return result;
};