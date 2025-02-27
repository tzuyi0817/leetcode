/**
 * @param {number[]} houses
 * @param {number} k
 * @return {number}
 */
const minDistance = function (houses, k) {
  const n = houses.length;
  const cost = Array.from({ length: n }, () => new Array(n).fill(0));
  const dp = Array.from({ length: n }, () => new Array(k + 1).fill(-1));

  houses.sort((a, b) => a - b);

  for (let a = 0; a < n; a++) {
    for (let b = a + 1; b < n; b++) {
      const median = Math.floor((a + b) / 2);

      for (let index = a; index <= b; index++) {
        cost[a][b] += Math.abs(houses[index] - houses[median]);
      }
    }
  }

  const allocateMailbox = (start, mailbox) => {
    if (start >= n && mailbox === k) return 0;
    if (start >= n || mailbox === k) return Number.MAX_SAFE_INTEGER;
    if (dp[start][mailbox] !== -1) return dp[start][mailbox];
    let result = Number.MAX_SAFE_INTEGER;

    for (let index = start; index < n; index++) {
      const currentCost = cost[start][index];
      const nextCost = allocateMailbox(index + 1, mailbox + 1);

      result = Math.min(currentCost + nextCost, result);
    }

    dp[start][mailbox] = result;

    return result;
  };

  return allocateMailbox(0, 0);
};
