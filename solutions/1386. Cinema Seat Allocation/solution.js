/**
 * @param {number} n
 * @param {number[][]} reservedSeats
 * @return {number}
 */
const maxNumberOfFamilies = function (n, reservedSeats) {
  const m = reservedSeats.length;
  let result = 0;

  const getSeats = (current, prev) => {
    if (prev === 2) prev += 1;

    if (current === 9) current -= 1;

    const seats = Math.floor((current - prev - 1) / 4);

    return Math.max(0, seats);
  };

  reservedSeats.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  reservedSeats.unshift([1, 0]);
  reservedSeats.push([n, 10]);

  for (let index = 1; index < m + 2; index++) {
    const [prevRow, prevSeat] = reservedSeats[index - 1];
    const [row, seat] = reservedSeats[index];

    if (prevRow === row) {
      const seats = getSeats(seat, prevSeat);

      result += seats;
    } else {
      const prevSeats = getSeats(10, prevSeat);
      const currentSeats = getSeats(seat, 1);
      const gapSeats = (row - prevRow - 1) * 2;

      result += prevSeats + gapSeats + currentSeats;
    }
  }

  return result;
};
