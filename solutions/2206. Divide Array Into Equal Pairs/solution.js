/**
 * @param {number[]} nums
 * @return {boolean}
 */
const divideArray = function (nums) {
  const countMap = new Map();

  for (const num of nums) {
    const count = countMap.get(num) ?? 0;

    countMap.set(num, count + 1);
  }

  for (const count of countMap.values()) {
    if (count % 2) return false;
  }

  return true;
};
