/**
 * @param {number[][]} tasks
 * @return {number}
 */
const minimumEffort = function (tasks) {
  let current = 0;
  let result = 0;

  tasks.sort((a, b) => {
    const diffA = a[1] - a[0];
    const diffB = b[1] - b[0];

    return diffB - diffA;
  });

  for (const [actual, minimum] of tasks) {
    const energy = Math.max(current, minimum);

    result += energy - current;
    current = energy - actual;
  }

  return result;
};
