/**
 * @param {number[]} nums
 * @return {number[]}
 */
const recoverArray = function (nums) {
  const n = nums.length;
  const countMap = new Map();

  nums.sort((a, b) => a - b);

  for (const num of nums) {
    const count = countMap.get(num) ?? 0;

    countMap.set(num, count + 1);
  }

  const getArray = (x, map) => {
    const result = [];

    for (const num of nums) {
      const count1 = map.get(num);

      if (!count1) continue;

      const count2 = map.get(num + x);

      if (!count2) return [];

      map.set(num, count1 - 1);
      map.set(num + x, count2 - 1);
      result.push((num + num + x) / 2);
    }

    return result;
  };

  for (let index = 1; index < n; index++) {
    const x = nums[index] - nums[0];

    if (x % 2 === 1 || x === 0) continue;

    const arr = getArray(x, new Map(countMap));

    if (arr.length) return arr;
  }

  return [];
};
