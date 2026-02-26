/**
 * @param {string} s
 * @return {number}
 */
const numSteps = function (s) {
  const n = s.length;
  let carry = 0;
  let steps = 0;

  for (let index = n - 1; index > 0; index--) {
    const num = Number(s[index]);
    const current = num + carry;

    if (current === 0) {
      steps += 1;
    } else if (current === 1) {
      steps += 2;
      carry = 1;
    } else {
      steps += 1;
      carry = 1;
    }
  }

  return steps + carry;
};
