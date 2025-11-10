/**
 * @param {number[]} nums
 * @return {number}
 */
const minOperations = function (nums) {
  const stack = [];
  let result = 0;

  for (const num of nums) {
    while (stack.length && stack.at(-1) > num) {
      stack.pop();
      result += 1;
    }

    if (num && stack.at(-1) !== num) {
      stack.push(num);
    }
  }

  return result + stack.length;
};
