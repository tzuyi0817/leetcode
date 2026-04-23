/**
 * @param {number[]} nums
 * @return {number[]}
 */
const distance = function (nums) {
  const n = nums.length;
  const prefixMap = new Map();
  const suffixMap = new Map();
  const result = Array.from({ length: n }, () => 0);

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    if (prefixMap.has(num)) {
      const { sum, count } = prefixMap.get(num);

      result[index] += index * count - sum;
      prefixMap.set(num, { sum: sum + index, count: count + 1 });
    } else {
      prefixMap.set(num, { sum: index, count: 1 });
    }
  }

  for (let index = n - 1; index >= 0; index--) {
    const num = nums[index];

    if (suffixMap.has(num)) {
      const { sum, count } = suffixMap.get(num);

      result[index] += Math.abs(index * count - sum);
      suffixMap.set(num, { sum: sum + index, count: count + 1 });
    } else {
      suffixMap.set(num, { sum: index, count: 1 });
    }
  }

  return result;
};
