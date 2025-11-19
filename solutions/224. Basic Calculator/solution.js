/**
 * @param {string} s
 * @return {number}
 */
const calculate = function (s) {
  const signStack = [1];
  let sign = 1;
  let index = 0;
  let result = 0;

  while (index < s.length) {
    let current = s[index];

    switch (current) {
      case '(': {
        signStack.push(signStack.at(-1) * sign);
        sign = 1;

        break;
      }
      case ')': {
        signStack.pop();
        break;
      }
      case '+': {
        sign = 1;
        break;
      }
      case '-': {
        sign = -1;
        break;
      }
      default:
        if (current !== ' ') {
          while (/\d/.test(s[index + 1])) {
            index += 1;
            current += s[index];
          }
          result += sign * current * signStack.at(-1);
        }
    }

    index += 1;
  }
  return result;
};
