/**
 * @param {number} n
 * @param {number[]} quantities
 * @return {number}
 */
const minimizedMaximum = function (n, quantities) {
  let left = 1;
  let right = Math.max(...quantities);

  const isDistributed = perQuantity => {
    let stores = n;

    for (const quantity of quantities) {
      stores -= Math.ceil(quantity / perQuantity);

      if (stores < 0) return false;
    }
    return true;
  };

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    isDistributed(mid) ? (right = mid) : (left = mid + 1);
  }
  return left;
};
