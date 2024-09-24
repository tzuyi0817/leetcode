/**
 * @param {number[]} nums
 * @return {number}
 */
const maxSumMinProduct = function (nums) {
  const MODULO = BigInt(10 ** 9 + 7);
  const size = nums.length;
  const stack = [];
  const prefixSum = Array(size + 1).fill(0);
  let result = 0;

  nums.forEach((num, index) => (prefixSum[index + 1] = prefixSum[index] + num));

  for (let index = 0; index <= size; index++) {
    const num = nums[index];

    while (stack.length && (nums[stack.at(-1)] > num || index === size)) {
      const minValue = BigInt(nums[stack.pop()]);
      const last = stack.length ? stack.at(-1) + 1 : 0;
      const sum = BigInt(prefixSum[index] - prefixSum[last]);
      const product = BigInt(minValue * sum);

      if (result >= product) continue;
      result = product;
    }
    stack.push(index);
  }
  return result % MODULO;
};
