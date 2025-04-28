/**
 * @param {number[]} customers
 * @param {number[]} grumpy
 * @param {number} minutes
 * @return {number}
 */
const maxSatisfied = function (customers, grumpy, minutes) {
  const n = customers.length;
  let left = 0;
  let result = 0;
  let current = 0;
  let maxKeep = 0;

  for (let index = 0; index < n; index++) {
    const isGrumpy = grumpy[index];
    const customer = customers[index];

    if (index - left >= minutes) {
      if (grumpy[left]) current -= customers[left];
      left += 1;
    }
    isGrumpy ? (current += customer) : (result += customer);
    maxKeep = Math.max(current, maxKeep);
  }
  return result + maxKeep;
};
