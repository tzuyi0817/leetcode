# [2999. Count the Number of Powerful Integers](https://leetcode.com/problems/count-the-number-of-powerful-integers)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given three integers <code>start</code>, <code>finish</code>, and <code>limit</code>. You are also given a <strong>0-indexed</strong> string <code>s</code> representing a <strong>positive</strong> integer.</p>

<p>A <strong>positive</strong> integer <code>x</code> is called <strong>powerful</strong> if it ends with <code>s</code> (in other words, <code>s</code> is a <strong>suffix</strong> of <code>x</code>) and each digit in <code>x</code> is at most <code>limit</code>.</p>

<p>Return <em>the <strong>total</strong> number of powerful integers in the range</em> <code>[start..finish]</code>.</p>

<p>A string <code>x</code> is a suffix of a string <code>y</code> if and only if <code>x</code> is a substring of <code>y</code> that starts from some index (<strong>including </strong><code>0</code>) in <code>y</code> and extends to the index <code>y.length - 1</code>. For example, <code>25</code> is a suffix of <code>5125</code> whereas <code>512</code> is not.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> start = 1, finish = 6000, limit = 4, s = "124"
<strong>Output:</strong> 5
<strong>Explanation:</strong> The powerful integers in the range [1..6000] are 124, 1124, 2124, 3124, and, 4124. All these integers have each digit &lt;= 4, and "124" as a suffix. Note that 5124 is not a powerful integer because the first digit is 5 which is greater than 4.
It can be shown that there are only 5 powerful integers in this range.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> start = 15, finish = 215, limit = 6, s = "10"
<strong>Output:</strong> 2
<strong>Explanation:</strong> The powerful integers in the range [15..215] are 110 and 210. All these integers have each digit &lt;= 6, and "10" as a suffix.
It can be shown that there are only 2 powerful integers in this range.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> start = 1000, finish = 2000, limit = 4, s = "3000"
<strong>Output:</strong> 0
<strong>Explanation:</strong> All integers in the range [1000..2000] are smaller than 3000, hence "3000" cannot be a suffix of any integer in this range.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= start &lt;= finish &lt;= 10<sup>15</sup></code></li>
	<li><code>1 &lt;= limit &lt;= 9</code></li>
	<li><code>1 &lt;= s.length &lt;= floor(log<sub>10</sub>(finish)) + 1</code></li>
	<li><code>s</code> only consists of numeric digits which are at most <code>limit</code>.</li>
	<li><code>s</code> does not have leading zeros.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(finish.length _ limit _ 2 _ 2 -> finish.length _ limit)</em>
- Space complexity: <em>O(finish.length _ 2 _ 2 -> finish.length)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} start
 * @param {number} finish
 * @param {number} limit
 * @param {string} s
 * @return {number}
 */
const numberOfPowerfulInt = function (start, finish, limit, s) {
  const a = `${start}`;
  const b = `${finish}`;
  const aWithLeadingZeros = '0'.repeat(b.length - a.length) + a;
  const mem = Array.from({ length: b.length }, () => {
    return new Array(2)
      .fill('')
      .map(() => new Array(2).fill(-1));
  });

  function count(a, i, tight1, tight2) {
    if (i + s.length === b.length) {
      const aMinSuffix = tight1 ? a.slice(-s.length) : '0'.repeat(s.length);
      const bMaxSuffix = tight2 ? b.slice(-s.length) : '9'.repeat(s.length);
      const suffix = Number(s);

      return Number(aMinSuffix) <= suffix && suffix <= Number(bMaxSuffix) ? 1 : 0;
    }

    if (mem[i][tight1 ? 1 : 0][tight2 ? 1 : 0] !== -1) {
      return mem[i][tight1 ? 1 : 0][tight2 ? 1 : 0];
    }

    const minDigit = tight1 ? Number(a[i]) : 0;
    const maxDigit = tight2 ? Number(b[i]) : 9;
    let res = 0;

    for (let d = minDigit; d <= maxDigit; d++) {
      if (d > limit) continue;
      const nextTight1 = tight1 && d === minDigit;
      const nextTight2 = tight2 && d === maxDigit;

      res += count(a, i + 1, nextTight1, nextTight2);
    }

    mem[i][tight1 ? 1 : 0][tight2 ? 1 : 0] = res;

    return res;
  }

  return count(aWithLeadingZeros, 0, true, true);
};
```
