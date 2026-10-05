/**
 * @param {string} s
 * @return {number}
 */
const scoreOfParentheses = function (s) {
  const stack = [];

  for (const char of s) {
    if (char === '(') {
      stack.push('(');

      continue;
    }

    let score = 0;

    while (stack.length && stack.at(-1) !== '(') {
      score += stack.pop();
    }

    stack.pop();

    if (score) {
      stack.push(2 * score);
    } else {
      stack.push(1);
    }
  }

  return stack.reduce((result, score) => result + score, 0);
};
