# [3260. Find the Largest Palindrome Divisible by K](https://leetcode.com/problems/find-the-largest-palindrome-divisible-by-k)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>You are given two <strong>positive</strong> integers <code>n</code> and <code>k</code>.</p>

<p>An integer <code>x</code> is called <strong>k-palindromic</strong> if:</p>

<ul>
	<li><code>x</code> is a <span data-keyword="palindrome-integer" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_t_" data-state="closed" class="">palindrome</button></span>.</li>
	<li><code>x</code> is divisible by <code>k</code>.</li>
</ul>

<p>Return the<strong> largest</strong> integer having <code>n</code> digits (as a string) that is <strong>k-palindromic</strong>.</p>

<p><strong>Note</strong> that the integer must <strong>not</strong> have leading zeros.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">n = 3, k = 5</span></p>

<p><strong>Output:</strong> <span class="example-io">"595"</span></p>

<p><strong>Explanation:</strong></p>

<p>595 is the largest k-palindromic integer with 3 digits.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">n = 1, k = 4</span></p>

<p><strong>Output:</strong> <span class="example-io">"8"</span></p>

<p><strong>Explanation:</strong></p>

<p>4 and 8 are the only k-palindromic integers with 1 digit.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">n = 5, k = 6</span></p>

<p><strong>Output:</strong> <span class="example-io">"89898"</span></p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= k &lt;= 9</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(nk)</em>
- Space complexity: <em>O(nk)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
const largestPalindrome = function (n, k) {
  const half = Math.ceil(n / 2);
  const pow10 = Array.from({ length: n }, () => 0);
  const contribution = Array.from({ length: half }, () => 0);

  pow10[0] = 1 % k;

  for (let index = 1; index < n; index++) {
    pow10[index] = (pow10[index - 1] * 10) % k;
  }

  for (let index = 0; index < half; index++) {
    const pair = n - 1 - index;
    const pairContribution = index === pair ? 0 : pow10[pair];

    contribution[index] = (pow10[index] + pairContribution) % k;
  }

  const dp = Array.from({ length: half }, () => new Array(k).fill(-1));

  const dfs = (index, mod) => {
    if (index === half) return mod === 0;

    if (dp[index][mod] !== -1) {
      return dp[index][mod] !== 10;
    }

    const limit = index === 0 ? 1 : 0;

    for (let num = 9; num >= limit; num--) {
      const nextMod = (num * contribution[index] + mod) % k;

      if (dfs(index + 1, nextMod)) {
        dp[index][mod] = num;

        return true;
      }
    }

    dp[index][mod] = 10;

    return false;
  };

  dfs(0, 0);

  const isOdd = Boolean(n % 2);
  const start = half - 1 - isOdd;
  let prefix = '';
  let mod = 0;
  let suffix = '';

  for (let index = 0; index < half; index++) {
    const num = dp[index][mod];

    mod = (mod + num * contribution[index]) % k;
    prefix += num;
  }

  for (let index = start; index >= 0; index--) {
    suffix += prefix[index];
  }

  return `${prefix}${suffix}`;
};
```
