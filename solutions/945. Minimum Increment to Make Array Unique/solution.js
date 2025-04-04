/**
 * @param {number[]} nums
 * @return {number}
 */
const minIncrementForUnique = function (nums) {
  const max = Math.max(...nums);
  const counts = new Array(max + 1).fill(0);
  let result = 0;
  let next = 0;

  for (const num of nums) {
    counts[num] += 1;
  }
  for (let num = 0; num <= max; num++) {
    while (counts[num] > 1) {
      if (num > next) next = num + 1;

      while (next <= max && counts[next]) next += 1;

      result += next - num;

      if (next <= max) {
        counts[next] += 1;
      } else {
        next += 1;
      }
      counts[num] -= 1;
    }
  }
  return result;
};
