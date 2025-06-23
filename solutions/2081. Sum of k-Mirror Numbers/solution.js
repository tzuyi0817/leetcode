/**
 * @param {number} k
 * @param {number} n
 * @return {number}
 */
const kMirror = function (k, n) {
  let mirrorNumber = [0];
  let result = 0;

  const nextMirrorNumber = () => {
    const { length } = mirrorNumber;

    for (let index = Math.floor(length / 2); index < length; index++) {
      const nextNum = mirrorNumber[index] + 1;

      if (nextNum >= k) continue;

      mirrorNumber[index] = nextNum;
      mirrorNumber[length - 1 - index] = nextNum;

      for (let left = Math.floor(length / 2); left < index; left++) {
        mirrorNumber[left] = 0;
        mirrorNumber[length - 1 - left] = 0;
      }

      return mirrorNumber;
    }

    const middle = new Array(length - 1).fill(0);

    return [1, ...middle, 1];
  };

  const getValidNumber = () => {
    mirrorNumber = nextMirrorNumber();
    const num = Number.parseInt(mirrorNumber.join(''), k);
    const splitNum = `${num}`.split('');
    let left = 0;
    let right = splitNum.length - 1;

    while (left < right) {
      if (splitNum[left] !== splitNum[right]) {
        return getValidNumber();
      }

      left += 1;
      right -= 1;
    }

    return num;
  };

  for (let count = 1; count <= n; count++) {
    result += getValidNumber();
  }

  return result;
};
