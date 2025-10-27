/**
 * @param {string[]} bank
 * @return {number}
 */
const numberOfBeams = function (bank) {
  const m = bank.length;
  const n = bank[0].length;
  let prevDevices = 0;
  let result = 0;

  for (let row = 0; row < m; row++) {
    let devices = 0;

    for (let col = 0; col < n; col++) {
      if (bank[row][col] === '1') {
        devices += 1;
      }
    }

    if (devices) {
      result += devices * prevDevices;
      prevDevices = devices;
    }
  }

  return result;
};
