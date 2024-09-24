/**
 * @param {string} s
 * @return {number}
 */
const calculate = function (s) {
  const signStack = [1];
  let sign = 1;
  let result = 0;

  for (let index = 0; index < s.length; index++) {
    let current = s[index];

    if (current === ' ') continue;
    if (current === '(') {
      signStack.push(signStack.at(-1) * sign);
      sign = 1;
    } else if (current === ')') signStack.pop();
    else if (current === '+') sign = 1;
    else if (current === '-') sign = -1;
    else {
      while (/\d/.test(s[index + 1])) {
        index += 1;
        current += s[index];
      }
      result += sign * current * signStack.at(-1);
    }
  }
  return result;
};
