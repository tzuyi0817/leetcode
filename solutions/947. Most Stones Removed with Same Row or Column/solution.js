/**
 * @param {number[][]} stones
 * @return {number}
 */
const removeStones = function (stones) {
  const n = stones.length;
  const stoneGroup = new Array(n).fill('').map((_, index) => index);

  const unionFind = x => {
    return stoneGroup[x] === x ? x : unionFind(stoneGroup[x]);
  };

  for (let a = 0; a < n; a++) {
    for (let b = a + 1; b < n; b++) {
      const [x1, y1] = stones[a];
      const [x2, y2] = stones[b];

      if (x1 !== x2 && y1 !== y2) continue;
      const groupA = unionFind(a);
      const groupB = unionFind(b);

      stoneGroup[groupB] = groupA;
    }
  }
  let result = n;

  for (let index = 0; index < n; index++) {
    if (index !== stoneGroup[index]) continue;
    result -= 1;
  }
  return result;
};
