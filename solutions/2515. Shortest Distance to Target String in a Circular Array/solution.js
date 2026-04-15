/**
 * @param {string[]} words
 * @param {string} target
 * @param {number} startIndex
 * @return {number}
 */
const closestTarget = function (words, target, startIndex) {
  const n = words.length;
  let result = Number.MAX_SAFE_INTEGER;

  for (let index = 0; index < n; index++) {
    const word = words[index];

    if (word !== target) continue;

    const leftSteps = (startIndex - index + n) % n;
    const rightSteps = (index - startIndex + n) % n;

    result = Math.min(leftSteps, rightSteps, result);
  }

  return result === Number.MAX_SAFE_INTEGER ? -1 : result;
};
