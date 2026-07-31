/**
 * @param {number[]} coins
 * @param {number} k
 * @return {number}
 */
const findKthSmallest = function (coins, k) {
  const n = coins.length;
  const maxMask = (1 << n) - 1;
  const lcmsPerPickSize = Array.from({ length: n + 1 }, () => []);
  let left = 1;
  let right = Math.min(...coins) * k;

  const isSmallerThanK = denomination => {
    let count = 0;

    for (let size = 1; size <= n; size++) {
      const sign = size % 2 ? 1 : -1;

      for (const value of lcmsPerPickSize[size]) {
        // 排容原理（PIE）
        count += Math.floor(denomination / value) * sign;
      }
    }

    return count < k;
  };

  for (let mask = 1; mask <= maxMask; mask++) {
    let currentLcm = 1;

    for (let index = 0; index < n; index++) {
      const isUsed = Boolean((mask >> index) & 1);

      if (!isUsed) continue;

      currentLcm = lcm(currentLcm, coins[index]);
    }

    const pickSize = popcount(mask);

    lcmsPerPickSize[pickSize].push(currentLcm);
  }

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    isSmallerThanK(mid) ? (left = mid + 1) : (right = mid - 1);
  }

  return left;
};

function gcd(a, b) {
  return b ? gcd(b, a % b) : a;
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function popcount(x) {
  let count = 0;

  while (x) {
    x &= x - 1;
    count += 1;
  }

  return count;
}
