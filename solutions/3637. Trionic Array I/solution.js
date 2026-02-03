/**
 * @param {number[]} nums
 * @return {boolean}
 */
const isTrionic = function (nums) {
  const n = nums.length;

  const trionic = (start, compare) => {
    for (let index = start; index < n; index++) {
      const prev = nums[index - 1];
      const num = nums[index];

      if (!compare(prev, num)) return index;
    }

    return n;
  };

  const p = trionic(1, (a, b) => a < b);

  if (p === 1) return false;

  const q = trionic(p, (a, b) => a > b);

  if (q === p) return false;

  const end = trionic(q, (a, b) => a < b);

  return end === n && end !== q;
};
