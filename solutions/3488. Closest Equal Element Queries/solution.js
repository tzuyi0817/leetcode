/**
 * @param {number[]} nums
 * @param {number[]} queries
 * @return {number[]}
 */
const solveQueries = function (nums, queries) {
  const n = nums.length;
  const numToIndexMap = new Map();

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    if (!numToIndexMap.has(num)) {
      numToIndexMap.set(num, []);
    }

    numToIndexMap.get(num).push(index);
  }

  const findNearestDistance = (target, indices) => {
    const m = indices.length;
    let left = 0;
    let right = m - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (indices[mid] > target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    const prev = (right - 1 + m) % m;
    const next = (right + 1) % m;
    const prevDis = Math.abs(indices[right] - indices[prev]);
    const nextDis = Math.abs(indices[next] - indices[right]);

    return Math.min(prevDis, n - prevDis, nextDis, n - nextDis);
  };

  return queries.map(index => {
    const indices = numToIndexMap.get(nums[index]);

    if (indices.length === 1) return -1;

    return findNearestDistance(index, indices);
  });
};
