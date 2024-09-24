/**
 * @param {number} n
 * @param {number[]} quantities
 * @return {number}
 */
const minimizedMaximum = function (n, quantities) {
  let left = 1;
  let right = Math.max(...quantities);

  function isMoreQuantity(quantity) {
    let stores = 0;

    for (const value of quantities) {
      stores += Math.ceil(value / quantity);
      if (stores > n) return true;
    }
    return false;
  }

  while (left < right) {
    const middle = Math.floor((left + right) / 2);

    isMoreQuantity(middle) ? (left = middle + 1) : (right = middle);
  }
  return left;
};
