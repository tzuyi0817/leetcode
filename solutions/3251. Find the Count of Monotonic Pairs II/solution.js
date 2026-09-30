/**
 * @param {number[]} nums
 * @return {number}
 */
const countOfPairs = function (nums) {
  const MODULO = 10 ** 9 + 7;
  const n = nums.length;
  const maxNum = Math.max(...nums);
  let dp = Array.from({ length: maxNum + 1 }, () => 0);

  for (let num = 0; num <= nums[0]; num++) {
    dp[num] = 1;
  }

  for (let index = 1; index < n; index++) {
    const current = nums[index];
    const prev = nums[index - 1];
    const nextDp = new Array(maxNum + 1).fill(0);
    let prevNum = 0;
    let ways = 0;

    for (let num = 0; num <= current; num++) {
      // prev - prevNum >= current - num
      const limit = Math.min(num, num - current + prev);

      if (prevNum <= limit) {
        ways = (ways + dp[prevNum]) % MODULO;
        prevNum += 1;
      }

      nextDp[num] = ways;
    }

    dp = nextDp;
  }

  return dp.reduce((result, ways) => (result + ways) % MODULO);
};
