# [3116. Kth Smallest Amount With Single Denomination Combination](https://leetcode.com/problems/kth-smallest-amount-with-single-denomination-combination)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given an integer array <code>coins</code> representing coins of different denominations and an integer <code>k</code>.</p>

<p>You have an infinite number of coins of each denomination. However, you are <strong>not allowed</strong> to combine coins of different denominations.</p>

<p>Return the <code>k<sup>th</sup></code> <strong>smallest</strong> amount that can be made using these coins.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block" style="border-color: var(--border-tertiary); border-left-width: 2px; color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 1rem; margin-top: 1rem; overflow: visible; padding-left: 1rem;">
<p><strong>Input:</strong> <span class="example-io" style="font-family: Menlo, sans-serif; font-size: 0.85rem;">coins = [3,6,9], k = 3</span></p>

<p><strong>Output:</strong> <span class="example-io" style="font-family: Menlo, sans-serif; font-size: 0.85rem;"> 9</span></p>

<p><strong>Explanation:</strong> The given coins can make the following amounts:<br>
Coin 3 produces multiples of 3: 3, 6, 9, 12, 15, etc.<br>
Coin 6 produces multiples of 6: 6, 12, 18, 24, etc.<br>
Coin 9 produces multiples of 9: 9, 18, 27, 36, etc.<br>
All of the coins combined produce: 3, 6, <u><strong>9</strong></u>, 12, 15, etc.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block" style="border-color: var(--border-tertiary); border-left-width: 2px; color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 1rem; margin-top: 1rem; overflow: visible; padding-left: 1rem;">
<p><strong>Input:</strong><span class="example-io" style="font-family: Menlo, sans-serif; font-size: 0.85rem;"> coins = [5,2], k = 7</span></p>

<p><strong>Output:</strong><span class="example-io" style="font-family: Menlo, sans-serif; font-size: 0.85rem;"> 12 </span></p>

<p><strong>Explanation:</strong> The given coins can make the following amounts:<br>
Coin 5 produces multiples of 5: 5, 10, 15, 20, etc.<br>
Coin 2 produces multiples of 2: 2, 4, 6, 8, 10, 12, etc.<br>
All of the coins combined produce: 2, 4, 5, 6, 8, 10, <u><strong>12</strong></u>, 14, 15, etc.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= coins.length &lt;= 15</code></li>
	<li><code>1 &lt;= coins[i] &lt;= 25</code></li>
	<li><code>1 &lt;= k &lt;= 2 * 10<sup>9</sup></code></li>
	<li><code>coins</code> contains pairwise distinct integers.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Stack`**

- Time complexity: <em>O(2<sup>n</sup>\*n+2<sup>n</sup>log(k\*Min(coins)))</em>
- Space complexity: <em>O(2<sup>n</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
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
```
