/**
 * @param {number[]} tickets
 * @param {number} k
 * @return {number}
 */
var timeRequiredToBuy = function(tickets, k) {
    const target = tickets[k];

    return tickets.reduce((result, time, index) => {
        const maxTime = index > k ? target - 1 : target;

        return result + Math.min(maxTime, time);
    }, 0);
};