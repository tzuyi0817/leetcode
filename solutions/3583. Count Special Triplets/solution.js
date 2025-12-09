/**
 * @param {number[]} nums
 * @return {number}
 */
const specialTriplets = function (nums) {
  const MODULO = 10 ** 9 + 7;
  const n = nums.length;
  const numMap = new Map();
  const partialMap = new Map();
  let result = 0;

  for (let index = 0; index < n; index++) {
    const num = nums[index];
    const count = numMap.get(num) ?? 0;

    numMap.set(num, count + 1);
  }

  for (let index = 0; index < n; index++) {
    const num = nums[index];
    const count = partialMap.get(num) ?? 0;
    const target = num * 2;
    const prefixCount = partialMap.get(target);

    partialMap.set(num, count + 1);

    if (prefixCount) {
      const suffixCount = numMap.get(target) - partialMap.get(target);

      result = (result + prefixCount * suffixCount) % MODULO;
    }
  }

  return result;
};
