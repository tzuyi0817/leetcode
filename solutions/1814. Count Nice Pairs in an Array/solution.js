/**
 * @param {number[]} nums
 * @return {number}
 */
const countNicePairs = function (nums) {
  const MODULO = 10 ** 9 + 7;
  const uniqueNums = [...new Set(nums)];
  const countMap = new Map();
  const reverseMap = uniqueNums.reduce((map, num) => {
    return (map[num] = +`${num}`.split('').reverse().join('')), map;
  }, {});
  let result = 0;

  for (const num of nums) {
    const diff = num - reverseMap[num];
    const count = countMap.get(diff) ?? 0;

    if (count) {
      result += count;
      result %= MODULO;
    }
    countMap.set(diff, count + 1);
  }
  return result;
};
