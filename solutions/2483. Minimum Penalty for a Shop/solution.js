/**
 * @param {string} customers
 * @return {number}
 */
const bestClosingTime = function (customers) {
  const n = customers.length;
  let prefixPenalty = 0;
  let suffixPenalty = 0;
  let minPenalty = n;
  let result = -1;

  for (let index = 0; index < n; index++) {
    const penalty = customers[index] === 'Y' ? 1 : 0;

    suffixPenalty += penalty;
  }

  for (let index = 0; index <= n; index++) {
    const penalty = customers[index] === 'N' ? 1 : 0;
    const totalPenalty = prefixPenalty + suffixPenalty;

    if (totalPenalty < minPenalty) {
      result = index;
      minPenalty = totalPenalty;
    }

    prefixPenalty += penalty;
    suffixPenalty += penalty - 1;
  }

  return result;
};
