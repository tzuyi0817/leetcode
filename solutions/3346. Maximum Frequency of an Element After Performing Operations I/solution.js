/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} numOperations
 * @return {number}
 */
const maxFrequency = function (nums, k, numOperations) {
  const countMap = new Map();
  const lineMap = new Map();
  const candidates = new Set();
  let adjustable = 0;
  let result = 0;

  for (const num of nums) {
    const count = countMap.get(num) ?? 0;
    const startNum = num - k;
    const endNum = num + k + 1;
    const startCount = lineMap.get(startNum) ?? 0;
    const endCount = lineMap.get(endNum) ?? 0;

    countMap.set(num, count + 1);
    lineMap.set(startNum, startCount + 1);
    lineMap.set(endNum, endCount - 1);
    candidates.add(num);
    candidates.add(startNum);
    candidates.add(endNum);
  }

  const sortedCandidates = [...candidates].toSorted((a, b) => a - b);

  for (const num of sortedCandidates) {
    if (lineMap.has(num)) {
      adjustable += lineMap.get(num);
    }

    const count = countMap.get(num) ?? 0;
    const adjusted = adjustable - count;
    const performedCount = count + Math.min(adjusted, numOperations);

    result = Math.max(performedCount, result);
  }

  return result;
};
