/**
 * @param {number[]} locations
 * @param {number} start
 * @param {number} finish
 * @param {number} fuel
 * @return {number}
 */
const countRoutes = function (locations, start, finish, fuel) {
  const MODULO = 10 ** 9 + 7;
  const n = locations.length;
  const dp = Array.from({ length: n }, () => new Array(fuel + 1).fill(-1));

  const moveToCity = (current, remainFuel) => {
    if (remainFuel < 0) return 0;
    if (dp[current][remainFuel] !== -1) return dp[current][remainFuel];
    const city = locations[current];
    let result = current === finish ? 1 : 0;

    for (let index = 0; index < n; index++) {
      if (index === current) continue;
      const nextCity = locations[index];
      const needFuel = Math.abs(city - nextCity);

      result += moveToCity(index, remainFuel - needFuel);
      result %= MODULO;
    }

    dp[current][remainFuel] = result;

    return result;
  };

  return moveToCity(start, fuel);
};
