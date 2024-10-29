/**
 * @param {number[]} nums
 * @return {boolean}
 */
const splitArraySameAverage = function (nums) {
  const n = nums.length;
  const sum = nums.reduce((result, num) => result + num);

  /* 
        sum / n === sum1 / count1 === sum2 / (n - count1)

        => sum1 = sum * count1 / n
        => sum * count1 % n === 0
    **/

  const sums = new Array(n).fill('').map(_ => new Set());

  sums[0].add(0);

  for (const num of nums) {
    for (let count = n - 1; count > 0; count--) {
      const target = (sum * count) / n;

      for (const previous of sums[count - 1]) {
        const current = previous + num;

        sums[count].add(current);
        if ((sum * count) % n !== 0) continue;
        if (current === target) return true;
      }
    }
  }
  return false;
};
