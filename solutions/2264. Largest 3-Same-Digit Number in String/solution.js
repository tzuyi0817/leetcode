/**
 * @param {string} num
 * @return {string}
 */
const largestGoodInteger = function (num) {
  const n = num.length;
  let maxGood = -1;
  let result = '';

  for (let index = 1; index < n; index++) {
    const str = num[index];

    if (str !== num[index - 1] || str !== num[index - 2]) {
      continue;
    }
    const integer = str.repeat(3);

    if (Number(integer) > maxGood) {
      result = integer;
      maxGood = Number(integer);
    }
  }

  return result;
};
