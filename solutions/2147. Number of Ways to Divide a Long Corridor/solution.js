/**
 * @param {string} corridor
 * @return {number}
 */
const numberOfWays = function (corridor) {
  const MODULO = BigInt(10 ** 9 + 7);
  const n = corridor.length;
  let prevSeat = 0;
  let seats = 0;
  let result = 1n;

  for (let index = 0; index < n; index++) {
    if (corridor[index] !== 'S') continue;

    seats += 1;

    if (seats > 2 && seats % 2 === 1) {
      const diff = BigInt(index - prevSeat);

      result = (result * diff) % MODULO;
    }

    prevSeat = index;
  }

  return seats && seats % 2 === 0 ? Number(result) : 0;
};
