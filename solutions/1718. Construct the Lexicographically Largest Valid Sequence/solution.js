/**
 * @param {number} n
 * @return {number[]}
 */
const constructDistancedSequence = function (n) {
  const size = n * 2 - 1;
  const result = [];
  const visited = new Set();
  const constructSequence = (index = 0) => {
    if (index >= size) return true;
    if (result[index]) return constructSequence(index + 1);

    for (let num = n; num > 0; num--) {
      if (visited.has(num)) continue;
      result[index] = num;
      visited.add(num);
      if (num === 1 && constructSequence(index + 1)) return true;
      if (index + num < size && !result[index + num]) {
        result[index + num] = num;
        if (constructSequence(index + 1)) return true;
        result[index + num] = 0;
      }
      result[index] = 0;
      visited.delete(num);
    }
    return false;
  };

  constructSequence();
  return result;
};
