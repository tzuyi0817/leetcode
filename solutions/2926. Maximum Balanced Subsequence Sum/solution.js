/**
 * @param {number[]} nums
 * @return {number}
 */
const maxBalancedSubsequenceSum = function (nums) {
  const n = nums.length;
  const bit = new BIT(n);
  const pairs = nums.map((num, index) => ({ val: num - index, index }));
  let result = Number.MIN_SAFE_INTEGER;

  pairs.sort((a, b) => a.val - b.val || a.index - b.index);

  for (const { index } of pairs) {
    const num = nums[index];
    const prevMax = bit.query(index);
    const sum = Math.max(prevMax, 0) + num;

    bit.update(index + 1, sum);
    result = Math.max(sum, result);
  }

  return result;
};

class BIT {
  constructor(n) {
    this.sums = Array.from({ length: n + 1 }, () => Number.MIN_SAFE_INTEGER);
  }

  update(index, delta) {
    while (index < this.sums.length) {
      if (this.sums[index] < delta) {
        this.sums[index] = delta;
      }

      index += index & -index;
    }
  }

  query(index) {
    let result = Number.MIN_SAFE_INTEGER;

    while (index) {
      result = Math.max(this.sums[index], result);
      index -= index & -index;
    }

    return result;
  }
}
