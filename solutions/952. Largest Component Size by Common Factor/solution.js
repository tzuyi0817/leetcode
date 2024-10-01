/**
 * @param {number[]} nums
 * @return {number}
 */
const largestComponentSize = function (nums) {
  const maxNum = Math.max(...nums);
  const groups = Array(maxNum + 1)
    .fill('')
    .map((_, index) => index);

  const unionFind = value => {
    return groups[value] === value ? value : unionFind(groups[value]);
  };

  for (const num of nums) {
    const sqrt = Math.floor(Math.sqrt(num));

    for (let value = sqrt; value > 1; value--) {
      if (num % value) continue;
      const groupA = unionFind(value);
      const groupB = unionFind(num);
      const groupC = unionFind(num / value);

      groups[groupB] = groupA;
      groups[groupC] = groupA;
    }
  }
  const countMap = new Map();
  let result = 0;

  for (const num of nums) {
    const group = unionFind(num);
    const count = countMap.get(group) ?? 0;

    countMap.set(group, count + 1);
    result = Math.max(count + 1, result);
  }
  return result;
};
