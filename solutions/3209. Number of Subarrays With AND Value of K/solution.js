/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const countSubarrays = function (nums, k) {
  let prev = new Map();
  let result = 0;

  for (const num of nums) {
    const current = new Map([[num, 1]]);

    for (const [prevNum, prevCount] of prev) {
      const nextNum = prevNum & num;
      const count = current.get(nextNum) ?? 0;

      current.set(nextNum, count + prevCount);
    }

    const count = current.get(k) ?? 0;

    result += count;
    prev = current;
  }

  return result;
};
