/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const countPairs = function (nums, k) {
  const n = nums.length;
  const numMap = new Map();
  let result = 0;

  const getDivisibleCount = (indices, pair) => {
    let count = 0;

    for (const index of indices) {
      if ((pair * index) % k) continue;

      count += 1;
    }

    return count;
  };

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    if (numMap.has(num)) {
      const indices = numMap.get(num);

      result += getDivisibleCount(indices, index);
      indices.push(index);
      continue;
    }

    numMap.set(num, [index]);
  }

  return result;
};
