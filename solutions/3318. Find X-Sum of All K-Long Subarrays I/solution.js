/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
const findXSum = function (nums, k, x) {
  const n = nums.length;
  const countMap = new Map();
  const result = [];

  const getXSum = () => {
    const counts = [...countMap.entries()];

    if (counts.length <= x) {
      return counts.reduce((sum, [num, count]) => sum + num * count, 0);
    }

    let sum = 0;

    counts.sort((a, b) => b[1] - a[1] || b[0] - a[0]);

    for (let index = 0; index < x; index++) {
      const [num, count] = counts[index];

      sum += num * count;
    }

    return sum;
  };

  for (let index = 0; index < k; index++) {
    const num = nums[index];
    const count = countMap.get(num) ?? 0;

    countMap.set(num, count + 1);
  }

  result.push(getXSum());

  for (let index = k; index < n; index++) {
    const removeNum = nums[index - k];
    const removeNumCount = countMap.get(removeNum);

    if (removeNumCount === 1) {
      countMap.delete(removeNum);
    } else {
      countMap.set(removeNum, removeNumCount - 1);
    }

    const num = nums[index];
    const count = countMap.get(num) ?? 0;

    countMap.set(num, count + 1);

    result.push(getXSum());
  }

  return result;
};
