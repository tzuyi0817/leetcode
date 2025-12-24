/**
 * @param {number[]} apple
 * @param {number[]} capacity
 * @return {number}
 */
const minimumBoxes = function (apple, capacity) {
  const n = capacity.length;
  let apples = apple.reduce((sum, apple) => sum + apple);

  capacity.sort((a, b) => b - a);

  for (let index = 0; index < n; index++) {
    apples -= capacity[index];

    if (apples <= 0) return index + 1;
  }

  return -1;
};
