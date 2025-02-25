/**
 * @param {number[]} balls
 * @return {number}
 */
const getProbability = function (balls) {
  const k = balls.length;
  const n = balls.reduce((result, ball) => result + ball) / 2;
  const factorialMemo = [1, 1];

  const factorial = n => {
    if (factorialMemo[n]) return factorialMemo[n];

    factorialMemo[n] = n * factorial(n - 1);

    return factorialMemo[n];
  };

  const distributeBall = (index, count1, count2, colors1, colors2, equal) => {
    if (count1 > n || count2 > n) return 0;
    if (index === k) {
      return equal ? colors1 === colors2 : 1;
    }
    let result = 0;

    for (let a = 0; a <= balls[index]; a++) {
      const b = balls[index] - a;
      const nextCount1 = count1 + a;
      const nextCount2 = count2 + b;
      const nextColors1 = colors1 + (a ? 1 : 0);
      const nextColors2 = colors2 + (b ? 1 : 0);
      const total = distributeBall(index + 1, nextCount1, nextCount2, nextColors1, nextColors2, equal);

      result += total / (factorial(a) * factorial(b));
    }

    return result;
  };

  return distributeBall(0, 0, 0, 0, 0, true) / distributeBall(0, 0, 0, 0, 0);
};
