/**
 * @param {number} n
 * @param {number[][]} restrictions
 * @return {number}
 */
const maxBuilding = function (n, restrictions) {
  restrictions.push([1, 0], [n, n - 1]);
  restrictions.sort((a, b) => a[0] - b[0]);

  const m = restrictions.length;
  let result = 0;

  for (let index = 1; index < m; index++) {
    const [l, hl] = restrictions[index - 1];
    const [r, hr] = restrictions[index];
    const interval = r - l;

    restrictions[index][1] = Math.min(hr, interval + hl);
  }

  for (let index = m - 2; index >= 0; index--) {
    const [l, hl] = restrictions[index];
    const [r, hr] = restrictions[index + 1];
    const interval = r - l;

    restrictions[index][1] = Math.min(hl, interval + hr);
  }

  for (let index = 1; index < m; index++) {
    const [l, hl] = restrictions[index - 1];
    const [r, hr] = restrictions[index];
    const interval = r - l - 1;
    const highest = Math.max(hl, hr) + Math.ceil((interval - Math.abs(hr - hl)) / 2);

    result = Math.max(highest, result);
  }

  return result;
};
