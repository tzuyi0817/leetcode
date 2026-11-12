# [3352. Count K-Reducible Numbers Less Than N](https://leetcode.com/problems/count-k-reducible-numbers-less-than-n)

## Description

<div class="xg0bVG_html" data-qd-rendered-description="" data-track-load="description_content"><p>You are given a <strong>binary</strong> string <code>s</code> representing a number <code>n</code> in its binary form.</p>

<p>You are also given an integer <code>k</code>.</p>

<p>An integer <code>x</code> is called <strong>k-reducible</strong> if performing the following operation <strong>at most</strong> <code>k</code> times reduces it to 1:</p>

<ul>
	<li>Replace <code>x</code> with the <strong>count</strong> of <span data-keyword="set-bit" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_t_" data-state="closed" class="">set bits</button></span> in its binary representation.</li>
</ul>

<p>For example, the binary representation of 6 is <code>"110"</code>. Applying the operation once reduces it to 2 (since <code>"110"</code> has two set bits). Applying the operation again to 2 (binary <code>"10"</code>) reduces it to 1 (since <code>"10"</code> has one set bit).</p>

<p>Return an integer denoting the number of positive integers <strong>less</strong> than <code>n</code> that are <strong>k-reducible</strong>.</p>

<p>Since the answer may be too large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "111", k = 1</span></p>

<p><strong>Output:</strong> <span class="example-io">3</span></p>

<p><strong>Explanation: </strong></p>

<p><code>n = 7</code>. The 1-reducible integers less than 7 are 1, 2, and 4.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "1000", k = 2</span></p>

<p><strong>Output:</strong> <span class="example-io">6</span></p>

<p><strong>Explanation:</strong></p>

<p><code>n = 8</code>. The 2-reducible integers less than 8 are 1, 2, 3, 4, 5, and 6.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "1", k = 3</span></p>

<p><strong>Output:</strong> <span class="example-io">0</span></p>

<p><strong>Explanation:</strong></p>

<p>There are no positive integers less than <code>n = 1</code>, so the answer is 0.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 800</code></li>
	<li><code>s</code> has no leading zeros.</li>
	<li><code>s</code> consists only of the characters <code>'0'</code> and <code>'1'</code>.</li>
	<li><code>1 &lt;= k &lt;= 5</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const countKReducibleNumbers = function (s, k) {
  const MODULO = 10 ** 9 + 7;
  const n = s.length;
  const ops = Array.from({ length: n + 1 }, () => 0);
  const dp = Array.from({ length: n }, () => {
    return new Array(2).fill('').map(() => new Array(n + 1).fill(-1));
  });

  for (let num = 2; num <= n; num++) {
    ops[num] = 1 + ops[popcount(num)];
  }

  const getReducibleCount = (index, bits, tight) => {
    if (index === n) {
      return bits && ops[bits] < k && !tight ? 1 : 0;
    }

    const key = Number(tight);

    if (dp[index][key][bits] !== -1) {
      return dp[index][key][bits];
    }

    const current = Number(s[index]);
    const limit = tight ? current : 1;
    let result = 0;

    for (let num = 0; num <= limit; num++) {
      const nextTight = tight && num === current;
      const count = getReducibleCount(index + 1, bits + num, nextTight);

      result = (result + count) % MODULO;
    }

    dp[index][key][bits] = result;

    return result;
  };

  return getReducibleCount(0, 0, true);
};

function popcount(num) {
  let result = 0;

  while (num) {
    num &= num - 1;
    result += 1;
  }

  return result;
}
```
