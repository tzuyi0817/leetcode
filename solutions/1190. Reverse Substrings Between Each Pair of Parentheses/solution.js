/**
 * @param {string} s
 * @return {string}
 */
const reverseParentheses = function (s) {
  const n = s.length;
  const stack = [];
  const pairMap = new Map();

  for (let index = 0; index < n; index++) {
    const char = s[index];

    if (char === '(') stack.push(index);
    if (char === ')') {
      const pair = stack.pop();

      pairMap.set(index, pair);
      pairMap.set(pair, index);
    }
  }

  let index = 0;
  let move = 1;
  let result = '';

  while (index < n) {
    const char = s[index];

    if (char === '(' || char === ')') {
      index = pairMap.get(index);
      move = -move;
    } else {
      result += char;
    }

    index += move;
  }
  return result;
};
