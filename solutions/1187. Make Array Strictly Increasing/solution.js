/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number}
 */
const makeArrayIncreasing = function (arr1, arr2) {
  const n = arr2.length;
  let dp = new Map([[-1, 0]]);

  arr2.sort((a, b) => a - b);

  const getAssignIndex = target => {
    let left = 0;
    let right = n;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      arr2[mid] > target ? (right = mid) : (left = mid + 1);
    }
    return left;
  };

  for (const num of arr1) {
    const nextDp = new Map();

    for (const [value, times] of dp) {
      if (num > value) {
        const numTimes = nextDp.get(num) ?? Number.MAX_SAFE_INTEGER;

        nextDp.set(num, Math.min(numTimes, times));
      }
      const index = getAssignIndex(value);

      if (index === n) continue;
      const assignNum = arr2[index];
      const assignNumTimes = nextDp.get(assignNum) ?? Number.MAX_SAFE_INTEGER;

      nextDp.set(assignNum, Math.min(assignNumTimes, times + 1));
    }
    if (!nextDp.size) return -1;
    dp = nextDp;
  }
  return Math.min(...dp.values());
};
