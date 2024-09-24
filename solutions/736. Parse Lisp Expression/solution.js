/**
 * @param {string} expression
 * @return {number}
 */
const evaluate = function (expression) {
  const getTokens = express => {
    const result = [];
    let scopeLevel = 0;
    let token = '';

    for (const char of express) {
      if (char === '(') scopeLevel += 1;
      if (char === ')') scopeLevel -= 1;
      if (!scopeLevel && char === ' ') {
        result.push(token);
        token = '';
        continue;
      }
      token += char;
    }
    token && result.push(token);
    return result;
  };

  const implement = (express, preScope) => {
    if (Number.isInteger(+express)) return +express;
    if (preScope.has(express)) return preScope.get(express);

    const scope = new Map(preScope);
    const variableStart = express.indexOf(' ') + 1;
    const sliceExpress = express.slice(variableStart, -1);
    const tokens = getTokens(sliceExpress);

    if (express.startsWith('(add')) {
      return implement(tokens[0], scope) + implement(tokens[1], scope);
    }
    if (express.startsWith('(mult')) {
      return implement(tokens[0], scope) * implement(tokens[1], scope);
    }

    for (let index = 1; index < tokens.length; index += 2) {
      const variable = tokens[index - 1];

      scope.set(variable, implement(tokens[index], scope));
    }
    return implement(tokens.at(-1), scope);
  };

  return implement(expression, new Map());
};
