/**
 * @param {number[][]} tasks
 * @return {number}
 */
const minimumEffort = function (tasks) {
  let currentEnergy = 0;
  let result = 0;

  tasks.sort((a, b) => {
    const [actualA, minimumA] = a;
    const [actualB, minimumB] = b;
    const diffA = minimumA - actualA;
    const diffB = minimumB - actualB;

    return diffB - diffA;
  });

  for (const [actual, minimum] of tasks) {
    const diff = Math.max(minimum - currentEnergy, 0);

    result += diff;
    currentEnergy += diff - actual;
  }

  return result;
};
