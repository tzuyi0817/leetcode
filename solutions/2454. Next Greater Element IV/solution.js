/**
 * @param {number[]} nums
 * @return {number[]}
 */
const secondGreaterElement = function (nums) {
  const n = nums.length;
  const prevStack = [];
  const currentStack = [];
  const result = Array.from({ length: n }, () => -1);

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    while (prevStack.length && nums[prevStack.at(-1)] < num) {
      const pos = prevStack.pop();

      result[pos] = num;
    }

    const decIndices = [];

    while (currentStack.length && nums[currentStack.at(-1)] < num) {
      const pos = currentStack.pop();

      decIndices.push(pos);
    }

    while (decIndices.length) {
      const pos = decIndices.pop();

      prevStack.push(pos);
    }

    currentStack.push(index);
  }

  return result;
};
