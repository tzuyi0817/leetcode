/**
 * @param {number[]} nums
 * @return {number}
 */
const numberOfSubarrays = function (nums) {
  const stack = [];
  let result = 0;

  for (const num of nums) {
    while (stack.length && stack.at(-1).num < num) {
      stack.pop();
    }

    if (!stack.length || stack.at(-1).num !== num) {
      stack.push({ num, count: 1 });
      result += 1;
    } else {
      const item = stack.at(-1);

      item.count += 1;
      result += item.count;
    }
  }

  return result;
};
