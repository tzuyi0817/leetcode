/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
const totalWaviness = function (num1, num2) {
  const start = Math.max(num1, 100);
  const end = Math.max(num2, 100);
  let result = 0;

  const getWaviness = num => {
    const target = `${num}`;
    const n = target.length;
    let waviness = 0;

    for (let index = 1; index < n - 1; index++) {
      const current = target[index];
      const prev = target[index - 1];
      const next = target[index + 1];

      if (current < prev && current < next) {
        waviness += 1;
      }

      if (current > prev && current > next) {
        waviness += 1;
      }
    }

    return waviness;
  };

  for (let num = start; num <= end; num++) {
    result += getWaviness(num);
  }

  return result;
};
