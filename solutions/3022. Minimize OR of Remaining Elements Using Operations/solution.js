/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minOrAfterOperations = function (nums, k) {
  const maxNum = Math.max(...nums);
  const MAX_BIT = 32 - Math.clz32(maxNum);
  let current = 0;
  let result = 0;

  const isValidTarget = target => {
    let mask = current;
    let operations = 0;

    for (const num of nums) {
      mask &= num;

      if ((mask | target) === target) {
        mask = current;
      } else {
        operations += 1;
      }

      if (operations > k) return false;
    }

    return true;
  };

  for (let bit = MAX_BIT; bit >= 0; bit--) {
    current |= 1 << bit;

    if (!isValidTarget(result)) {
      result |= 1 << bit;
    }
  }

  return result;
};
