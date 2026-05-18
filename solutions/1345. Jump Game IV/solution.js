/**
 * @param {number[]} arr
 * @return {number}
 */
const minJumps = function (arr) {
  const n = arr.length;
  const jumpMap = new Map();
  let queue = [0];
  let result = 0;

  for (let index = 0; index < n; index++) {
    const value = arr[index];

    if (!jumpMap.has(value)) {
      jumpMap.set(value, new Set());
    }

    jumpMap.get(value).add(index);
  }

  while (queue.length) {
    const nextQueue = [];

    for (const pos of queue) {
      if (pos === n - 1) return result;

      const value = arr[pos];
      const jumpBack = pos - 1;
      const jumpForward = pos + 1;
      const candidates = jumpMap.get(value) ?? [];

      if (jumpBack >= 0 && jumpMap.has(arr[jumpBack])) {
        nextQueue.push(jumpBack);
      }

      if (jumpForward < n && jumpMap.has(arr[jumpForward])) {
        nextQueue.push(jumpForward);
      }

      jumpMap.delete(value);

      for (const nextPos of candidates) {
        nextQueue.push(nextPos);
      }
    }

    queue = nextQueue;
    result += 1;
  }

  return -1;
};
