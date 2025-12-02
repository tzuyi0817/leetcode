/**
 * @param {number[][]} points
 * @return {number}
 */
const countTrapezoids = function (points) {
  const MODULO = BigInt(10 ** 9 + 7);
  const yMap = new Map();
  let sides = 0n;
  let result = 0n;

  for (const point of points) {
    const y = point[1];
    const count = yMap.get(y) ?? 0n;

    yMap.set(y, count + 1n);
  }

  for (const count of yMap.values()) {
    if (count < 2n) continue;

    const side = ((count * (count - 1n)) / 2n) % MODULO;

    result = (result + side * sides) % MODULO;
    sides = (sides + side) % MODULO;
  }

  return Number(result);
};
