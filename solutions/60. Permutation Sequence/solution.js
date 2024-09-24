/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
const getPermutation = function (n, k) {
  const nums = Array(n)
    .fill('')
    .map((_, index) => index + 1);
  const factorial = Array(n + 1).fill(1);
  let result = '';

  for (let num = 1; num <= n; num++) {
    factorial[num] = num * factorial[num - 1];
  }
  k -= 1;
  for (let num = n - 1; num >= 0; num--) {
    const index = Math.floor(k / factorial[num]);

    result += nums[index];
    nums.splice(index, 1);
    k = k % factorial[num];
  }
  return result;
};
