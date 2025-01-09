/**
 * @param {number[]} arr
 * @return {number}
 */
const minJumps = function (arr) {
  const n = arr.length;

  if (n === 1) return 0;
  const arrMap = new Map();

  for (let index = 0; index < n; index++) {
    const value = arr[index];

    if (!arrMap.has(value)) {
      arrMap.set(value, []);
    }
    const indices = arrMap.get(value);

    indices.push(index);
  }

  let queue = [0];
  let result = 0;

  const isValidIndex = index => index > -1 && index < n && arrMap.has(arr[index]);

  while (queue.length) {
    const nextQueue = [];

    result += 1;

    for (const index of queue) {
      const value = arr[index];
      const forwardIndex = index + 1;
      const backIndex = index - 1;

      if (forwardIndex === n - 1 || backIndex === n - 1) return result;
      if (isValidIndex(forwardIndex)) {
        nextQueue.push(forwardIndex);
      }
      if (isValidIndex(backIndex)) {
        nextQueue.push(backIndex);
      }

      for (const nextIndex of arrMap.get(value) ?? []) {
        if (nextIndex === n - 1) return result;
        nextQueue.push(nextIndex);
      }
      arrMap.delete(value);
    }
    queue = nextQueue;
  }
  return -1;
};
