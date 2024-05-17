/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(k, prices) {
    const n = prices.length;

    if (k >= n / 2) {
        let result = 0;

        for (let index = 0; index < n - 1; index++) {
            const current = prices[index];
            const next = prices[index + 1];

            if (current >= next) continue;
            result += next - current;
        }
        return result;
    }
    const hold = Array(k + 1).fill(Number.MIN_SAFE_INTEGER);
    const sell = Array(k + 1).fill(0);
    
    for (const price of prices) {
        for (let times = 1; times <= k; times++) {
            sell[times] = Math.max(sell[times], hold[times] + price);
            hold[times] = Math.max(hold[times], sell[times - 1] - price);
        }
    }
    return sell[k];
};