/**
 * @param {number[]} nums
 * @return {number}
 */
const maxLength = function (nums) {
  const n = nums.length;
  let result = 1;

  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  const lcm = (a, b) => (a * b) / gcd(a, b);

  for (let a = 0; a < n; a++) {
    let prod = 1;
    let g = nums[a];
    let l = nums[a];

    for (let b = a; b < n; b++) {
      const num = nums[b];

      prod *= num;
      g = gcd(g, num);
      l = lcm(l, num);

      if (prod !== g * l) continue;

      const len = b - a + 1;

      result = Math.max(len, result);
    }
  }

  return result;
};
