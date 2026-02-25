/**
 * @param {number} n
 * @param {number} k
 * @param {number[][]} time
 * @return {number}
 */
const findCrossingTime = function (n, k, time) {
  const efficiencyCompare = (a, b) => {
    const efficientA = time[a][0] + time[a][2];
    const efficientB = time[b][0] + time[b][2];

    return efficientB - efficientA || b - a;
  };

  const leftWaitHeap = new PriorityQueue(efficiencyCompare);
  const rightWaitHeap = new PriorityQueue(efficiencyCompare);
  const leftWorkingHeap = new MinPriorityQueue(({ readyTime }) => readyTime);
  const rightWorkingHeap = new MinPriorityQueue(({ readyTime }) => readyTime);
  let current = 0;
  let boxes = n;

  for (let index = 0; index < k; index++) {
    leftWaitHeap.enqueue(index);
  }

  while (boxes || rightWaitHeap.size() || rightWorkingHeap.size()) {
    while (leftWorkingHeap.size() && leftWorkingHeap.front().readyTime <= current) {
      const { id } = leftWorkingHeap.dequeue();

      leftWaitHeap.enqueue(id);
    }

    while (rightWorkingHeap.size() && rightWorkingHeap.front().readyTime <= current) {
      const { id } = rightWorkingHeap.dequeue();

      rightWaitHeap.enqueue(id);
    }

    if (rightWaitHeap.size()) {
      const id = rightWaitHeap.dequeue();

      current += time[id][2];
      leftWorkingHeap.enqueue({ id, readyTime: current + time[id][3] });
    } else if (boxes && leftWaitHeap.size()) {
      const id = leftWaitHeap.dequeue();

      current += time[id][0];
      rightWorkingHeap.enqueue({ id, readyTime: current + time[id][1] });
      boxes -= 1;
    } else {
      const time1 = leftWorkingHeap.front()?.readyTime ?? Number.MAX_SAFE_INTEGER;
      const time2 = rightWorkingHeap.front()?.readyTime ?? Number.MAX_SAFE_INTEGER;

      current = Math.min(time1, time2);
    }
  }

  return current;
};
