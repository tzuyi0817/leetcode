/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum2 = function (candidates, target) {
  const n = candidates.length;
  const result = [];

  candidates.sort((a, b) => a - b);

  const combinationSum = (start, collection, sum) => {
    if (sum > target) return;
    if (sum === target) {
      result.push([...collection]);
      return;
    }

    for (let index = start; index < n; index++) {
      const candidate = candidates[index];

      if (index > start && candidate === candidates[index - 1]) continue;
      collection.push(candidate);
      combinationSum(index + 1, collection, sum + candidate);
      collection.pop();
    }
  };

  combinationSum(0, [], 0);
  return result;
};
