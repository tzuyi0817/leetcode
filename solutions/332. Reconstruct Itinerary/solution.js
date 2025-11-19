/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
const findItinerary = function (tickets) {
  const ticketsMap = tickets.reduce((map, [from, to]) => {
    const arrives = map.get(from) ?? [];

    arrives.push(to);
    return map.set(from, arrives);
  }, new Map());

  for (const arrives of ticketsMap.values()) {
    arrives.sort((a, b) => b.localeCompare(a));
  }

  const result = [];
  const departsAirline = airline => {
    const arrives = ticketsMap.get(airline) ?? [];

    while (arrives.length) {
      departsAirline(arrives.pop());
    }
    result.push(airline);
  };

  departsAirline('JFK');

  return result.toReversed();
};
