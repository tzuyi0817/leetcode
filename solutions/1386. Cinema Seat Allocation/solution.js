/**
 * @param {number} n
 * @param {number[][]} reservedSeats
 * @return {number}
 */
const maxNumberOfFamilies = function (n, reservedSeats) {
  const reservedMap = reservedSeats.reduce((map, [row, labelled]) => {
    const labelleds = map.get(row) ?? new Set();

    labelleds.add(labelled);

    return map.set(row, labelleds);
  }, new Map());
  const getSeats = (labelleds, check) => {
    return check.some(labelled => labelleds.has(labelled)) ? 0 : 1;
  };
  let result = 0;

  reservedMap.forEach(labelleds => {
    const seats = getSeats(labelleds, [2, 3, 4, 5]) + getSeats(labelleds, [6, 7, 8, 9]);

    result += seats || getSeats(labelleds, [4, 5, 6, 7]);
  });

  return result + (n - reservedMap.size) * 2;
};
