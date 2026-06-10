/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maxTotalValue = function (nums, k) {
  const n = nums.length;
  const maxLog = 32 - Math.clz32(n);
  const maxSt = Array.from({ length: n }, () => new Array(maxLog).fill(0));
  const minSt = Array.from({ length: n }, () => new Array(maxLog).fill(0));
  const maxHeap = new MaxHeap(({ value }) => value);
  const visited = new Set();
  let result = 0;

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    maxSt[index][0] = num;
    minSt[index][0] = num;
  }

  for (let l = 1; l < maxLog; l++) {
    const half = 1 << (l - 1);

    for (let index = 0; index + half < n; index++) {
      const halfStart = index + half;

      maxSt[index][l] = Math.max(maxSt[index][l - 1], maxSt[halfStart][l - 1]);
      minSt[index][l] = Math.min(minSt[index][l - 1], minSt[halfStart][l - 1]);
    }
  }

  const queryMax = (l, r) => {
    const len = r - l + 1;
    const log = 31 - Math.clz32(len);
    const half = 1 << log;

    return Math.max(maxSt[l][log], maxSt[r - half + 1][log]);
  };

  const queryMin = (l, r) => {
    const len = r - l + 1;
    const log = 31 - Math.clz32(len);
    const half = 1 << log;

    return Math.min(minSt[l][log], minSt[r - half + 1][log]);
  };

  const pushSub = (l, r) => {
    if (l > r) return;

    const key = `${l},${r}`;

    if (visited.has(key)) return;

    const maxValue = queryMax(l, r);
    const minValue = queryMin(l, r);
    const value = maxValue - minValue;

    maxHeap.push({ value, l, r });
    visited.add(key);
  };

  pushSub(0, n - 1);

  while (maxHeap.size() && k) {
    const { value, l, r } = maxHeap.pop();

    result += value;
    pushSub(l + 1, r);
    pushSub(l, r - 1);
    k -= 1;
  }

  return result;
};
