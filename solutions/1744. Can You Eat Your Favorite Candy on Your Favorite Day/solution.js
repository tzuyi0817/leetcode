/**
 * @param {number[]} candiesCount
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var canEat = function(candiesCount, queries) {
    const prfixCandiesCount = [0];

    for (let index = 0; index < candiesCount.length; index++) {
        prfixCandiesCount.push(prfixCandiesCount[index] + candiesCount[index]);
    }
    
    return queries.map(([type, day, cap]) => {
        const minDay = Math.floor(prfixCandiesCount[type] / cap);
        const maxDay = prfixCandiesCount[type + 1] - 1;

        return minDay <= day && maxDay >= day;
    });
};
