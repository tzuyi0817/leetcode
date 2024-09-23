/**
 * @param {number[][]} tasks
 * @return {number[]}
 */
var getOrder = function(tasks) {
    const size = tasks.length;
    const taskQueue = tasks.map(([enqueueTime, processTime], index) => {
        return { enqueueTime, processTime, task: index };
    }).sort((a, b) => a.enqueueTime - b.enqueueTime);

    const priorityQueue = new MinPriorityQueue({ compare: (a, b) => {
        if (a.processTime === b.processTime) return a.task - b.task;
        return a.processTime - b.processTime;
    }});
    const result = [];
    let currentTime = taskQueue[0].enqueueTime;
    let index = 0;

    while (result.length < size) {
        while (index < size && taskQueue[index].enqueueTime <= currentTime) {
            priorityQueue.enqueue(taskQueue[index]);
            index += 1;
        }

        if (priorityQueue.isEmpty()) {
            currentTime = taskQueue[index].enqueueTime;
            continue;
        }
        const current = priorityQueue.dequeue();

        result.push(current.task);
        currentTime += current.processTime;
    }
    return result;
};