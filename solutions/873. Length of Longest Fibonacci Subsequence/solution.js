/**
 * @param {number[]} arr
 * @return {number}
 */
const lenLongestFibSubseq = function (arr) {
  const n = arr.length;
  const valueMap = new Map();
  const dp = new Map();
  let result = 0;

  for (let index = 0; index < n; index++) {
    valueMap.set(arr[index], index);
  }

  for (let a = 1; a < n; a++) {
    for (let b = 0; b < a; b++) {
      const target = arr[a] - arr[b];

      if (target >= arr[b] || !valueMap.has(target)) continue;
      const c = valueMap.get(target);
      const len = dp.get(`${c},${b}`) ?? 0;

      dp.set(`${b},${a}`, len + 1);
      result = Math.max(len + 1, result);
    }
  }

  return result ? result + 2 : 0;
};
