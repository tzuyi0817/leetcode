/**
 * @param {string[]} words
 * @return {string}
 */
const shortestSuperstring = function (words) {
  const n = words.length;
  const costs = setupCosts(words, n);
  const dp = initializeDP(words, n);
  const parent = Array.from({ length: 1 << n })
    .fill('')
    .map(_ => new Array(n).fill(-1));

  setupCosts(words, n);
  fillDPandParent(dp, parent, costs, n);

  let result = '';
  const dpBack = dp[(1 << n) - 1];
  let a = dpBack.indexOf(Math.min(...dpBack));
  let mask = (1 << n) - 1;

  while (mask > 0) {
    const index = parent[mask][a];

    if (index === -1) {
      result = words[a] + result;
    } else {
      result = words[a].slice(words[a].length - costs[index][a]) + result;
    }
    mask -= 1 << a;
    a = index;
  }
  return result;
};

function setupCosts(words, n) {
  const costs = new Array(n).fill('').map(_ => new Array(n).fill(0));

  const getCost = (a, b) => {
    const minLength = Math.min(a.length, b.length);
    let cost = b.length;

    for (let index = 1; index <= minLength; index++) {
      if (a.slice(-index) !== b.slice(0, index)) continue;
      cost = b.length - index;
    }
    return cost;
  };

  for (let a = 0; a < n; a++) {
    for (let b = 0; b < n; b++) {
      costs[a][b] = getCost(words[a], words[b]);
      costs[b][a] = getCost(words[b], words[a]);
    }
  }
  return costs;
}

function initializeDP(words, n) {
  const dp = Array.from({ length: 1 << n })
    .fill('')
    .map(() => new Array(n).fill(Number.MAX_SAFE_INTEGER));

  for (let i = 0; i < n; i++) {
    dp[1 << i][i] = words[i].length;
  }
  return dp;
}

function fillDPandParent(dp, parent, costs, n) {
  for (let mask = 1; mask < 1 << n; mask++) {
    for (let a = 0; a < n; a++) {
      if ((mask & (1 << a)) === 0) continue;

      for (let b = 0; b < n; b++) {
        const cost = dp[mask - (1 << a)][b] + costs[b][a];

        if (cost >= dp[mask][a]) continue;
        dp[mask][a] = cost;
        parent[mask][a] = b;
      }
    }
  }
}
