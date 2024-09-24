/**
 * @param {number[]} nums
 * @return {number}
 */
const tupleSameProduct = function (nums) {
  const productMap = new Map();
  let result = 0;

  for (let a = 1; a < nums.length; a++) {
    for (let b = 0; b < a; b++) {
      const product = nums[a] * nums[b];
      const count = productMap.get(product) ?? 0;

      result += 8 * count;
      productMap.set(product, count + 1);
    }
  }
  return result;
};
