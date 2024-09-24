/**
 * @param {number[]} seats
 * @param {number[]} students
 * @return {number}
 */
const minMovesToSeat = function (seats, students) {
  seats.sort((a, b) => a - b);
  students.sort((a, b) => a - b);

  return seats.reduce((result, seat, index) => {
    return result + Math.abs(seat - students[index]);
  }, 0);
};
