/**
 * @param {string} num
 * @param {number} target
 * @return {string[]}
 */
const addOperators = function (num, target) {
  const n = num.length;
  const result = [];
  const backtrackingExpression = (start, expression, total, last) => {
    if (start === n) {
      total === target && result.push(expression);
      return;
    }
    let current = '';

    for (let index = start; index < n; index++) {
      current += num[index];

      if (current.length > 1 && current[0] === '0') return;
      const next = +current;
      const product = last * next;

      backtrackingExpression(index + 1, `${expression}+${current}`, total + next, next);
      backtrackingExpression(index + 1, `${expression}-${current}`, total - next, -next);
      backtrackingExpression(index + 1, `${expression}*${current}`, total - last + product, product);
    }
  };
  let current = '';

  for (let index = 0; index < n; index++) {
    current += num[index];
    if (current.length > 1 && current[0] === '0') return result;
    backtrackingExpression(index + 1, current, +current, +current);
  }
  return result;
};
