/**
 * @param {number[]} target
 * @return {boolean}
 */
const isPossible = function (target) {
  const queue = new MaxPriorityQueue();
  let sum = target.reduce((result, num) => result + num);

  for (const num of target) {
    queue.enqueue(num);
  }

  while (queue.front().element > 1) {
    const num = queue.dequeue().element;
    const restSum = sum - num;

    if (restSum === 0) return false;
    if (restSum === 1) return true;
    const nextNum = num % restSum;

    if (nextNum < 1 || nextNum === num) return false;
    queue.enqueue(nextNum);
    sum = sum - num + nextNum;
  }
  return true;
};
