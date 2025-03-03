/**
 * @param {number[]} nums
 * @param {number} pivot
 * @return {number[]}
 */
const pivotArray = function (nums, pivot) {
  const lessStack = [];
  const greaterStack = [];
  const equalStack = [];

  for (const num of nums) {
    if (num < pivot) lessStack.push(num);
    else if (num > pivot) greaterStack.push(num);
    else equalStack.push(num);
  }

  return [...lessStack, ...equalStack, ...greaterStack];
};
