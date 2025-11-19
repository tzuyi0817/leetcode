/**
 * @param {number[]} inventory
 * @param {number} orders
 * @return {number}
 */
const maxProfit = function (inventory, orders) {
  const MODULO = BigInt(10 ** 9 + 7);
  const size = inventory.length;
  let result = 0n;
  let index = 0;

  inventory.sort((a, b) => b - a);
  let current = inventory[0];

  while (orders > 0) {
    while (index < size && inventory[index] === current) index += 1;
    const next = index === size ? 0 : inventory[index];
    let times = current - next;
    let remain = 0;
    const count = index * times;

    if (orders < count) {
      times = Math.floor(orders / index);
      remain = orders % index;
    }
    const endValue = current - times;
    const sell = ((BigInt(current + endValue + 1) * BigInt(times * index)) / 2n) % MODULO;

    result = (result + sell + BigInt(endValue * remain)) % MODULO;
    orders -= count;
    current = next;
  }
  return result;
};
