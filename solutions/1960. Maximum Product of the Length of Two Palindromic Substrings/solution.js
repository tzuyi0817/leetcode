/**
 * @param {string} s
 * @return {number}
 */
const maxProduct = function (s) {
  const n = s.length;

  const manacher = str => {
    const maxExtends = Array.from({ length: n }, () => 0);
    const leftToRight = Array.from({ length: n }, () => 1);
    let center = 0;

    for (let index = 0; index < n; index++) {
      const r = center + maxExtends[center] - 1;
      const mirrorIndex = center - (index - center);
      let extend = index > r ? 1 : Math.min(maxExtends[mirrorIndex], r - index + 1);

      while (index - extend >= 0 && index + extend < n && str[index - extend] === str[index + extend]) {
        leftToRight[index + extend] = 2 * extend + 1;
        extend += 1;
      }

      maxExtends[index] = extend;

      if (index + maxExtends[index] >= r) {
        center = index;
      }
    }

    for (let index = 1; index < n; index++) {
      leftToRight[index] = Math.max(leftToRight[index], leftToRight[index - 1]);
    }

    return leftToRight;
  };

  const maxLeft = manacher(s);
  const reversed = s.split('').reverse().join('');
  const maxRight = manacher(reversed).reverse();
  let reuslt = 1;

  for (let index = 1; index < n; index++) {
    reuslt = Math.max(reuslt, maxLeft[index - 1] * maxRight[index]);
  }

  return reuslt;
};
