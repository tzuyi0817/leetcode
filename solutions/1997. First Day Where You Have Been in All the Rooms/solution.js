/**
 * @param {number[]} nextVisit
 * @return {number}
 */
const firstDayBeenInAllRooms = function (nextVisit) {
  const MODULO = 10 ** 9 + 7;
  const size = nextVisit.length;
  const visitDay = Array(size).fill(0);

  for (let index = 1; index < size; index++) {
    const previousRoom = index - 1;
    const day = visitDay[previousRoom];
    const oddTimes = day - visitDay[nextVisit[previousRoom]] + 1;
    const evenTimes = day + 1;

    visitDay[index] = (oddTimes + evenTimes + MODULO) % MODULO;
  }
  return visitDay[size - 1];
};
