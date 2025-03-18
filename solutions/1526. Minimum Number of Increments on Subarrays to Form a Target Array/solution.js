/**
 * @param {number[]} target
 * @return {number}
 */
const minNumberOperations = function (target) {
  const n = target.length;
  let result = target[0];

  for (let index = 1; index < n; index++) {
    const current = target[index];
    const prev = target[index - 1];

    if (prev >= current) continue;

    result += current - prev;
  }

  return result;
};
