/**
 * @param {number[]} nums
 * @return {number}
 */
const minimumDistance = function (nums) {
  const n = nums.length;
  const numMap = new Map();
  let result = Number.MAX_SAFE_INTEGER;

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    if (!numMap.has(num)) {
      numMap.set(num, []);
    }

    numMap.get(num).push(index);
  }

  for (const indices of numMap.values()) {
    const len = indices.length;

    if (len < 3) continue;

    for (let index = 2; index < len; index++) {
      const i = indices[index];
      const j = indices[index - 1];
      const k = indices[index - 2];
      const dis = i - j + i - k + j - k;

      result = Math.min(dis, result);
    }
  }

  return result === Number.MAX_SAFE_INTEGER ? -1 : result;
};
