/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const minimumChanges = function (s, k) {
  const n = s.length;
  const factors = getFactors(n);
  const cost = getCost(s, n, factors);
  const dp = Array.from({ length: n + 1 }, () => new Array(k + 1).fill(n));

  dp[n][0] = 0;

  for (let i = n - 1; i >= 0; i--) {
    for (let j = 1; j <= k; j++) {
      for (let l = i + 1; l < n; l++) {
        dp[i][j] = Math.min(dp[i][j], dp[l + 1][j - 1] + cost[i][l]);
      }
    }
  }

  return dp[0][k];
};

function getFactors(n) {
  const factors = Array.from({ length: n + 1 }, () => []);

  for (let index = 1; index <= n; index++) {
    factors[index].push(1);
  }

  for (let d = 2; d < n; d++) {
    for (let index = d * 2; index <= n; index += d) {
      factors[index].push(d);
    }
  }

  return factors;
}

function calcSubCost(s, i, j, d) {
  let cost = 0;

  for (let offset = 0; offset < d; ++offset) {
    let l = i + offset;
    let r = j - d + 1 + offset;

    while (l < r) {
      if (s[l] !== s[r]) {
        ++cost;
      }

      l += d;
      r -= d;
    }
  }

  return cost;
}

function getCost(s, n, factors) {
  const cost = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let i = 0; i < n; ++i) {
    for (let j = i + 1; j < n; ++j) {
      const length = j - i + 1;
      let minCost = length;

      for (const d of factors[length]) {
        minCost = Math.min(minCost, calcSubCost(s, i, j, d));
      }

      cost[i][j] = minCost;
    }
  }

  return cost;
}
