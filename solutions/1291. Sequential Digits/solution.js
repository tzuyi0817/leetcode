/**
 * @param {number} low
 * @param {number} high
 * @return {number[]}
 */
const sequentialDigits = function (low, high) {
  const result = [];
  let queue = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  while (queue.length) {
    const nextQueue = [];

    for (const num of queue) {
      if (num > high) continue;

      if (num >= low) {
        result.push(num);
      }

      const prev = num % 10;
      const nextDigit = prev + 1;

      if (nextDigit > 9) continue;

      nextQueue.push(num * 10 + nextDigit);
    }

    queue = nextQueue;
  }

  return result;
};
