/**
 * @param {number[]} nums
 * @param {number} start
 * @param {number} goal
 * @return {number}
 */
const minimumOperations = function (nums, start, goal) {
  const visited = new Set();
  let queue = [start];
  let result = 0;

  function isValidOperation(value) {
    if (value < 0 || value > 1000) return false;
    if (visited.has(value)) return false;
    visited.add(value);
    return true;
  }

  while (queue.length) {
    const size = queue.length;
    const nextQueue = [];

    result += 1;
    for (let index = 0; index < size; index++) {
      const value = queue.pop();

      for (const num of nums) {
        const add = value + num;
        const minus = value - num;
        const xor = value ^ num;

        if (add === goal || minus === goal || xor === goal) return result;
        isValidOperation(add) && nextQueue.push(add);
        isValidOperation(minus) && nextQueue.push(minus);
        isValidOperation(xor) && nextQueue.push(xor);
      }
    }
    queue = nextQueue;
  }
  return -1;
};
