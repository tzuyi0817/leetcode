/**
 * @param {number[]} status
 * @param {number[]} candies
 * @param {number[][]} keys
 * @param {number[][]} containedBoxes
 * @param {number[]} initialBoxes
 * @return {number}
 */
const maxCandies = function (status, candies, keys, containedBoxes, initialBoxes) {
  const OPEN = 1;
  const keySet = new Set();
  let result = 0;
  let queue = initialBoxes;

  const setKey = box => {
    for (const key of keys[box]) {
      keySet.add(key);
    }
  };

  while (queue.length) {
    const nextQueue = [];
    let isOpenNewBox = false;

    for (const index of queue) {
      if (status[index] === OPEN || keySet.has(index)) {
        result += candies[index];
        if (keySet.has(index)) {
          keySet.delete(index);
        }
        setKey(index);
        nextQueue.push(...containedBoxes[index]);
        isOpenNewBox = true;
      } else if (!nextQueue.includes(index)) {
        nextQueue.push(index);
      }
    }
    if (!isOpenNewBox) break;
    queue = nextQueue;
  }
  return result;
};
