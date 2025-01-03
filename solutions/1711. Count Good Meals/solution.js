/**
 * @param {number[]} deliciousness
 * @return {number}
 */
const countPairs = function (deliciousness) {
  const MODULO = 10 ** 9 + 7;
  const powers = Array.from({ length: 22 })
    .fill('')
    .map((_, index) => 2 ** index);
  const countMap = new Map();
  let result = 0;

  for (const meal of deliciousness) {
    for (const power of powers) {
      const target = power - meal;

      if (!countMap.has(target)) continue;
      result = (result + countMap.get(target)) % MODULO;
    }
    countMap.set(meal, (countMap.get(meal) ?? 0) + 1);
  }
  return result;
};
