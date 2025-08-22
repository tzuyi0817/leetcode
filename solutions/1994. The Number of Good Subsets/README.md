# [1994. The Number of Good Subsets](https://leetcode.com/problems/the-number-of-good-subsets)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an integer array <code>nums</code>. We call a subset of <code>nums</code> <strong>good</strong> if its product can be represented as a product of one or more <strong>distinct prime</strong> numbers.</p>

<ul>
	<li>For example, if <code>nums = [1, 2, 3, 4]</code>:
    <ul>
    	<li><code>[2, 3]</code>, <code>[1, 2, 3]</code>, and <code>[1, 3]</code> are <strong>good</strong> subsets with products <code>6 = 2*3</code>, <code>6 = 2*3</code>, and <code>3 = 3</code> respectively.</li>
    	<li><code>[1, 4]</code> and <code>[4]</code> are not <strong>good</strong> subsets with products <code>4 = 2*2</code> and <code>4 = 2*2</code> respectively.</li>
    </ul>
    </li>
</ul>

<p>Return <em>the number of different <strong>good</strong> subsets in </em><code>nums</code><em> <strong>modulo</strong> </em><code>10<sup>9</sup> + 7</code>.</p>

<p>A <strong>subset</strong> of <code>nums</code> is any array that can be obtained by deleting some (possibly none or all) elements from <code>nums</code>. Two subsets are different if and only if the chosen indices to delete are different.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,3,4]
<strong>Output:</strong> 6
<strong>Explanation:</strong> The good subsets are:
- [1,2]: product is 2, which is the product of distinct prime 2.
- [1,2,3]: product is 6, which is the product of distinct primes 2 and 3.
- [1,3]: product is 3, which is the product of distinct prime 3.
- [2]: product is 2, which is the product of distinct prime 2.
- [2,3]: product is 6, which is the product of distinct primes 2 and 3.
- [3]: product is 3, which is the product of distinct prime 3.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [4,2,3,15]
<strong>Output:</strong> 5
<strong>Explanation:</strong> The good subsets are:
- [2]: product is 2, which is the product of distinct prime 2.
- [2,3]: product is 6, which is the product of distinct primes 2 and 3.
- [2,15]: product is 30, which is the product of distinct primes 2, 3, and 5.
- [3]: product is 3, which is the product of distinct prime 3.
- [15]: product is 15, which is the product of distinct primes 3 and 5.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 30</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming + Bit Manipulation`**

- Time complexity: <em>O(2<sup>10</sup>)</em>
- Space complexity: <em>O(2<sup>10</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const numberOfGoodSubsets = function (nums) {
  const MOD = BigInt(10 ** 9 + 7);
  const freq = Array.from({ length: 31 }, () => 0n);
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
  const masks = Array.from({ length: 31 }, () => -1);

  for (const num of nums) {
    freq[num] += 1n;
  }

  for (let num = 2; num <= 30; num++) {
    let mask = 0;
    let current = num;
    let valid = true;

    for (const [index, prime] of primes.entries()) {
      let count = 0;

      while (current % prime === 0) {
        current /= prime;
        count++;
      }

      if (count > 1) {
        valid = false;
        break;
      }

      if (count === 1) {
        mask |= 1 << index;
      }
    }

    if (valid) {
      masks[num] = mask;
    }
  }

  const dp = Array.from({ length: 1 << primes.length }, () => 0n);

  dp[0] = 1n;

  for (let num = 2; num <= 30; num++) {
    if (freq[num] === 0n || masks[num] === -1) continue;

    const mask = masks[num];

    for (let state = (1 << primes.length) - 1; state >= 0; state--) {
      if ((state & mask) === 0) {
        dp[state | mask] = (dp[state | mask] + dp[state] * freq[num]) % MOD;
      }
    }
  }

  let result = 0n;

  for (let state = 1; state < 1 << primes.length; state++) {
    result = (result + dp[state]) % MOD;
  }

  if (freq[1] > 0n) {
    result = (result * modPow(2n, freq[1], MOD)) % MOD;
  }

  return Number(result);
};

function modPow(base, exp, mod) {
  let res = 1n;

  while (exp > 0n) {
    if (exp & 1n) {
      res = (res * base) % mod;
    }

    base = (base * base) % mod;
    exp >>= 1n;
  }

  return res;
}
```
