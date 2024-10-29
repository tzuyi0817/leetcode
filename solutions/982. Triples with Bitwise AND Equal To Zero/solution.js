/**
 * @param {number[]} nums
 * @return {number}
 */
const countTriplets = function (nums) {
  const maxNum = Math.max(...nums);
  const counts = new Array(maxNum + 1).fill(0);
  let result = 0;

  for (const a of nums) {
    for (const b of nums) {
      const AND = a & b;

      counts[AND] += 1;
    }
  }

  for (const a of nums) {
    for (let b = 0; b <= maxNum; b++) {
      if (a & b) continue;

      result += counts[b];
    }
  }
  return result;
};
