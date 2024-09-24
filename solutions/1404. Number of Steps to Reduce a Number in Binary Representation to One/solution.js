/**
 * @param {string} s
 * @return {number}
 */
const numSteps = function (s) {
  let step = (carry = 0);

  for (let index = s.length - 1; index > 0; index--) {
    const value = s[index];

    if (value === '0') {
      step += carry ? 2 : 1;
      continue;
    }
    step += carry ? 1 : 2;
    carry = 1;
  }
  return step + carry;
};
