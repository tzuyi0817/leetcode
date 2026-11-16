/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
const digitSum = function (s, k) {
  let current = s;

  while (current.length > k) {
    const len = current.length;
    let next = '';
    let sum = 0;

    for (let index = 0; index < len; index++) {
      const digit = Number(current[index]);

      sum += digit;

      if ((index + 1) % k === 0) {
        next += sum;
        sum = 0;
      }
    }

    if (len % k) {
      next += sum;
    }

    current = next;
  }

  return current;
};
