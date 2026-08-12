/**
 * @param {number} k
 * @return {number}
 */
const waysToReachStair = function (k) {
  const memo = new Map();

  const getWaysToReachK = (stairs, jump, prevDown) => {
    if (stairs - 1 > k || stairs < 0) return 0;

    const key = `${stairs},${jump},${Number(prevDown)}`;

    if (memo.has(key)) return memo.get(key);

    let result = stairs === k ? 1 : 0;

    if (!prevDown) {
      result += getWaysToReachK(stairs - 1, jump, true);
    }

    const nextStairs = stairs + 2 ** jump;

    result += getWaysToReachK(nextStairs, jump + 1, false);

    memo.set(key, result);

    return result;
  };

  return getWaysToReachK(1, 0, false);
};
