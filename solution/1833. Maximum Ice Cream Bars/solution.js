/**
 * @param {number[]} costs
 * @param {number} coins
 * @return {number}
 */
var maxIceCream = function(costs, coins) {
    const maxCost = Math.max(...costs);
    const iceCreamMap = costs.reduce((map, cost) => {
        const count = map.get(cost) ?? 0;
        
        return map.set(cost, count + 1);
    }, new Map());
    let result = 0;

    for (let cost = 1; cost <= maxCost; cost++) {
        const count = iceCreamMap.get(cost);

        if (!count) continue;
        if (coins > cost * count) {
            coins -= cost * count;
            result += count;
            continue;
        }
        result += Math.floor(coins / cost);
        return result;
    }
    return result;
};