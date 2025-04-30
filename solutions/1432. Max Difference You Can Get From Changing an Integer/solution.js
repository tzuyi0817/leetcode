/**
 * @param {number} num
 * @return {number}
 */
const maxDiff = function (num) {
  const numStringify = `${num}`;
  let max = numStringify;
  let min = numStringify;

  for (let index = 0; index < numStringify; index++) {
    const value = numStringify[index];

    if (value !== '9') {
      max = max.replaceAll(value, '9');
      break;
    }
  }

  for (let index = 0; index < numStringify; index++) {
    const value = numStringify[index];

    if (index === 0) {
      if (value !== '1') {
        min = min.replaceAll(value, '1');
        break;
      }
      continue;
    }
    if (value === '0' || value === numStringify[0]) continue;
    min = min.replaceAll(value, '0');
    break;
  }

  return max - min;
};
