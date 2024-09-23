/**
 * @param {number[][]} classes
 * @param {number} extraStudents
 * @return {number}
 */
var maxAverageRatio = function(classes, extraStudents) {
    const queue = new MaxPriorityQueue({ priority: x => x.ratio });
    const enqueue = (pass, total) => {
        const beforeRatio = pass / total;
        const afterRatio = (pass + 1) / (total + 1);

        queue.enqueue({ pass, total, ratio: afterRatio - beforeRatio });
    }
    let totalRatio = 0;

    for (const [pass, total] of classes) {
        enqueue(pass, total);
    }
    while(extraStudents--) {
        const { pass, total } = queue.dequeue().element;
        
        enqueue(pass + 1, total + 1);
    }
    while (!queue.isEmpty()) {
        const { pass, total } = queue.dequeue().element;

        totalRatio += pass / total;
    }
    return totalRatio / classes.length;
};
