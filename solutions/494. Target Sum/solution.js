/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const findTargetSumWays = function (nums, target) {
  const n = nums.length;
  const memo = new Map();

  const buildExpression = (index, sum) => {
    if (index >= n) return sum === target ? 1 : 0;
    const key = `${index},${sum}`;

    if (memo.has(key)) return memo.get(key);
    const num = nums[index];
    const plus = buildExpression(index + 1, sum + num);
    const minus = buildExpression(index + 1, sum + num * -1);
    const result = plus + minus;

    memo.set(key, result);

    return result;
  };

  return buildExpression(0, 0);
};
