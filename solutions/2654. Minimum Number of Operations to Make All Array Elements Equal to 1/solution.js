/**
 * @param {number[]} nums
 * @return {number}
 */
const minOperations = function (nums) {
  const n = nums.length;
  const ones = nums.filter(num => num === 1).length;

  if (ones) {
    return n - ones;
  }

  let minOperations = Number.MAX_SAFE_INTEGER;

  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  const getOperations = (start, current) => {
    for (let index = start; index < n; index++) {
      current = gcd(current, nums[index]);

      if (current === 1) {
        return index - start - 1;
      }
    }

    return Number.MAX_SAFE_INTEGER;
  };

  for (let index = 0; index < n; index++) {
    const operations = getOperations(index, 0);

    minOperations = Math.min(operations, minOperations);
  }

  return minOperations === Number.MAX_SAFE_INTEGER ? -1 : minOperations + n;
};
