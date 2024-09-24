/**
 * @param {number[]} nums
 * @return {number}
 */
const waysToMakeFair = function (nums) {
  const size = nums.length;
  const oddPrefix = [0];
  const evenPrefix = [nums[0]];
  let result = 0;

  for (let index = 1; index < size; index++) {
    const num = nums[index];
    const isOdd = index % 2;

    oddPrefix[index] = oddPrefix[index - 1] + (isOdd ? num : 0);
    evenPrefix[index] = evenPrefix[index - 1] + (isOdd ? 0 : num);
  }
  for (let index = 0; index < size; index++) {
    const left = {
      odd: index ? oddPrefix[index - 1] : 0,
      even: index ? evenPrefix[index - 1] : 0,
    };
    const right = {
      odd: oddPrefix[size - 1] - oddPrefix[index],
      even: evenPrefix[size - 1] - evenPrefix[index],
    };
    if (left.odd + right.even === left.even + right.odd) result += 1;
  }
  return result;
};
