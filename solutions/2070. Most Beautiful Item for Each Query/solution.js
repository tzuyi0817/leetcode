/**
 * @param {number[][]} items
 * @param {number[]} queries
 * @return {number[]}
 */
var maximumBeauty = function(items, queries) {
    const priceMap = items.reduce((map, [price, beauty]) => {
        if (map[price] >= beauty) return map;
        map[price] = beauty;
        return map;
    }, {});
    const prices = Object.keys(priceMap);

    function findPrice(target) {
        let left = 0;
        let right = prices.length - 1;

        while (left < right) {
            const middle = Math.floor((left + right) / 2);

            prices[middle] > target ? right = middle : left = middle + 1;
        }
        return prices[left] > target ? left - 1 : left;
    }

    for (let index = 1; index < prices.length; index++) {
        const price = prices[index];

        priceMap[price] = Math.max(priceMap[price], priceMap[prices[index - 1]])
    }
    return queries.map(price => {
        if (priceMap[price]) return priceMap[price];
        const lessPrice = prices[findPrice(price)];

        return lessPrice ? priceMap[lessPrice] : 0;
    });
};