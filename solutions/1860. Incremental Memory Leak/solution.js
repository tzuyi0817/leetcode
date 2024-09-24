/**
 * @param {number} memory1
 * @param {number} memory2
 * @return {number[]}
 */
const memLeak = function (memory1, memory2) {
  let consumes = 1;

  while (memory1 >= consumes || memory2 >= consumes) {
    memory1 < memory2 ? (memory2 -= consumes) : (memory1 -= consumes);
    consumes += 1;
  }
  return [consumes, memory1, memory2];
};
