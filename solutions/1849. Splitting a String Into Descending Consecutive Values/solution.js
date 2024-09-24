/**
 * @param {string} s
 * @return {boolean}
 */
const splitString = function (s) {
  const size = s.length;
  const isValid = (start, target) => {
    for (let index = start; index < size; index++) {
      const value = +s.slice(start, index + 1);

      if (target - value !== 1) continue;
      if (index === size - 1) return true;
      if (isValid(index + 1, value)) return true;
    }
    return false;
  };

  for (let index = 0; index < size; index++) {
    const value = +s.slice(0, index + 1);

    if (isValid(index + 1, value)) return true;
  }
  return false;
};
