/**
 * @param {number} m
 * @param {number} n
 * @param {number} introvertsCount
 * @param {number} extrovertsCount
 * @return {number}
 */
const getMaxGridHappiness = function (m, n, introvertsCount, extrovertsCount) {
  const nMask = 1 << n;
  const introvertsDiff = -30;
  const extrovertsDiff = 20;
  const memo = new Map();

  const getCost = (row, col, iMask, eMask, diff) => {
    let result = 0;

    if (row > 0) {
      if ((iMask >> (n - 1)) & 1) {
        result += diff + introvertsDiff;
      }

      if ((eMask >> (n - 1)) & 1) {
        result += diff + extrovertsDiff;
      }
    }

    if (col > 0) {
      if (iMask & 1) {
        result += diff + introvertsDiff;
      }

      if (eMask & 1) {
        result += diff + extrovertsDiff;
      }
    }

    return result;
  };

  const assignCell = (pos, iMask, eMask, iCount, eCount) => {
    if (pos >= m * n) return 0;
    if (!iCount && !eCount) return 0;
    const key = `${pos},${iMask},${eMask},${iCount},${eCount}`;

    if (memo.has(key)) return memo.get(key);
    const row = Math.floor(pos / n);
    const col = pos % n;
    const nextIMask = (iMask << 1) & (nMask - 1);
    const nextEMask = (eMask << 1) & (nMask - 1);
    let result = assignCell(pos + 1, nextIMask, nextEMask, iCount, eCount);

    if (iCount) {
      const cost = getCost(row, col, iMask, eMask, introvertsDiff);
      const happiness = 120 + assignCell(pos + 1, nextIMask | 1, nextEMask, iCount - 1, eCount);

      result = Math.max(happiness + cost, result);
    }

    if (eCount) {
      const cost = getCost(row, col, iMask, eMask, extrovertsDiff);
      const happiness = 40 + assignCell(pos + 1, nextIMask, nextEMask | 1, iCount, eCount - 1);

      result = Math.max(happiness + cost, result);
    }

    memo.set(key, result);

    return result;
  };

  return assignCell(0, 0, 0, introvertsCount, extrovertsCount);
};
