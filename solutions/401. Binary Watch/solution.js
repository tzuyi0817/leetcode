/**
 * @param {number} turnedOn
 * @return {string[]}
 */
const readBinaryWatch = function (turnedOn) {
  const HOUR = 12;
  const MINUTE = 60;
  const result = [];

  const popcount = value => {
    let count = 0;

    while (value) {
      value &= value - 1;
      count += 1;
    }

    return count;
  };

  for (let h = 0; h < HOUR; h++) {
    for (let m = 0; m < MINUTE; m++) {
      if (popcount(h) + popcount(m) === turnedOn) {
        const minute = `${m}`.padStart(2, '0');
        const time = `${h}:${minute}`;

        result.push(time);
      }
    }
  }

  return result;
};
