/**
 * @param {number} n
 * @return {number}
 */
const checkRecord = function (n) {
  const MODULO = 10 ** 9 + 7;
  const present = new Array(n + 1).fill(0);
  const late = new Array(n + 1).fill(0);
  const absent = new Array(n + 1).fill(0);

  present[1] = late[1] = absent[1] = 1;

  if (n > 1) {
    late[2] = present[1] + late[1] + absent[1]; // P, L, A
    absent[2] = present[1] + late[1]; // P, L
  }
  if (n > 2) absent[3] = (present[1] + late[1]) * 2; // PP, LL, PL, LP

  const sumTimes = (...nums) => nums.reduce((result, num) => (result + num) % MODULO);

  for (let index = 2; index <= n; index++) {
    const lastPresent = present[index - 1];
    const lastLate = late[index - 1];
    const lastAbsent = absent[index - 1];

    present[index] = sumTimes(lastPresent, lastLate, lastAbsent);
    if (index === 2) continue;

    late[index] = sumTimes(lastPresent, lastAbsent, present[index - 2], absent[index - 2]);
    if (index === 3) continue;

    absent[index] = sumTimes(lastAbsent, absent[index - 2], absent[index - 3]);
  }
  return sumTimes(present[n], late[n], absent[n]);
};
