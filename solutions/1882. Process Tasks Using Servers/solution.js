/**
 * @param {number[]} servers
 * @param {number[]} tasks
 * @return {number[]}
 */
const assignTasks = function (servers, tasks) {
  const idleQueue = new PriorityQueue({ compare: (a, b) => a.weight - b.weight || a.index - b.index });
  const processQueue = new MinPriorityQueue({ priority: ({ completeSeconds }) => completeSeconds });
  let currentSeconds = 0;

  servers.forEach((weight, index) => idleQueue.enqueue({ weight, index }));

  return tasks.map((seconds, index) => {
    if (idleQueue.isEmpty()) currentSeconds = processQueue.front().element.completeSeconds;
    if (currentSeconds < index) currentSeconds = index;
    while (!processQueue.isEmpty() && processQueue.front().element.completeSeconds <= currentSeconds) {
      const processed = processQueue.dequeue().element;

      idleQueue.enqueue(processed);
    }
    const idle = idleQueue.dequeue();
    const completeSeconds = currentSeconds + seconds;

    processQueue.enqueue({ ...idle, completeSeconds });
    return idle.index;
  }, []);
};
