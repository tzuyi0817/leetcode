/**
 * @param {number[]} digits
 * @return {number[]}
 */
const findEvenNumbers = function (digits) {
  const countMap = digits.reduce((map, integer) => {
    const count = map.get(integer) ?? 0;

    return map.set(integer, count + 1);
  }, new Map());
  const result = [];

  for (let integer = 100; integer <= 998; integer += 2) {
    const [a, b, c] = `${integer}`.split('');
    const countA = countMap.get(+a);
    const countB = countMap.get(+b);
    const countC = countMap.get(+c);

    if (!countA || !countB || !countC) continue;
    if (a === b && b === c && countA < 3) continue;
    if ((a === b || a === c) && countA < 2) continue;
    if (b === c && countB < 2) continue;
    result.push(integer);
  }
  return result;
};
