/**
 * @param {number[][]} orders
 * @return {number}
 */
var getNumberOfBacklogOrders = function(orders) {
    const MODULO = 10 ** 9 + 7;
    const buyQueue = new MaxPriorityQueue({ priority:x => x.price });
    const sellQueue = new MinPriorityQueue({ priority:x => x.price });
    const comparePrice = ({ isBuy, price, checkQueue }) => {
        const backlogPrice = checkQueue.front().element.price;

        return isBuy ? backlogPrice <= price : backlogPrice >= price;
    };
    let result = 0;
    
    for (let [price, amount, orderType] of orders) {
        const isBuy = orderType === 0;
        const currentQueue =  isBuy ? buyQueue : sellQueue;
        const checkQueue = isBuy ? sellQueue : buyQueue;
        
        while (!checkQueue.isEmpty() && amount > 0 && comparePrice({ isBuy, price, checkQueue })) {
            const order = checkQueue.dequeue().element;

            if (amount >= order.amount) {
                amount -= order.amount;
            } else {
                order.amount -= amount;
                amount = 0;
                checkQueue.enqueue(order);
            }
        }
        if (amount === 0) continue;
        currentQueue.enqueue({ price, amount });
    }

    while (!buyQueue.isEmpty()) result += buyQueue.dequeue().element.amount;
    while (!sellQueue.isEmpty()) result += sellQueue.dequeue().element.amount;
    return result % MODULO;
};
