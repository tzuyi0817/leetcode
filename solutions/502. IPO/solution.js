/**
 * @param {number} k
 * @param {number} w
 * @param {number[]} profits
 * @param {number[]} capital
 * @return {number}
 */
var findMaximizedCapital = function(k, w, profits, capital) {
    const maxCapital = Math.max(...capital);

    if (w >= maxCapital) {
        profits.sort((a, b) => b - a);

        return profits.slice(0, k).reduce((result, profit) => result + profit, w);
    }
    const n = profits.length;
    const projects = capital.map((principal, index) => ({ principal, profit: profits[index] }));

    projects.sort((a, b) => a.principal - b.principal || b.profit - a.profit);

    const queue = new MaxPriorityQueue();
    let result = w;
    let index = 0;

    for (let times = 0; times < k; times++) {
        while (index < n && projects[index].principal <= result) {
            queue.enqueue(projects[index].profit);
            index += 1;
        }
        if (queue.isEmpty()) return result;
        result += queue.dequeue().element;
    }
    return result;
};