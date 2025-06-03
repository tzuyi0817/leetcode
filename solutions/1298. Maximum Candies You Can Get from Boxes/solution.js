/**
 * @param {number[]} status
 * @param {number[]} candies
 * @param {number[][]} keys
 * @param {number[][]} containedBoxes
 * @param {number[]} initialBoxes
 * @return {number}
 */
const maxCandies = function (status, candies, keys, containedBoxes, initialBoxes) {
  const n = status.length;
  const haveKey = Array.from({ length: n }, () => false);
  let queue = initialBoxes;
  let result = 0;

  while (queue.length) {
    const nextQueue = [];
    let isOpenNewBox = false;

    for (const box of queue) {
      if (status[box] || haveKey[box]) {
        result += candies[box];
        nextQueue.push(...containedBoxes[box]);
        isOpenNewBox = true;

        for (const key of keys[box]) {
          haveKey[key] = true;
        }
      } else {
        nextQueue.push(box);
      }
    }

    if (!isOpenNewBox) return result;

    queue = nextQueue;
  }

  return result;
};
