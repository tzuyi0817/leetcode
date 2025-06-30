/**
 * @param {number[]} nums
 * @return {number}
 */
const findLHS = function (nums) {
  const countMap = new Map();
  let result = 0;

  for (const num of nums) {
    const count = countMap.get(num) ?? 0;

    countMap.set(num, count + 1);
  }

  for (const [num, count] of countMap) {
    if (!countMap.has(num + 1)) continue;
    const totalCount = count + countMap.get(num + 1);

    result = Math.max(totalCount, result);
  }

  return result;
};
