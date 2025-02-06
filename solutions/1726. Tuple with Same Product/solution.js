/**
 * @param {number[]} nums
 * @return {number}
 */
const tupleSameProduct = function (nums) {
  const n = nums.length;
  const productMap = new Map();
  let result = 0;

  for (let a = 0; a < n - 1; a++) {
    for (let b = a + 1; b < n; b++) {
      const product = nums[a] * nums[b];
      const count = productMap.get(product) ?? 0;

      productMap.set(product, count + 1);
    }
  }

  for (const count of productMap.values()) {
    if (count < 2) continue;
    const tuples = (count * (count - 1)) / 2;

    result += tuples * 8;
  }
  return result;
};
