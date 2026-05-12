# [2827. Number of Beautiful Integers in the Range](https://leetcode.com/problems/number-of-beautiful-integers-in-the-range)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given positive integers <code>low</code>, <code>high</code>, and <code>k</code>.</p>

<p>A number is <strong>beautiful</strong> if it meets both of the following conditions:</p>

<ul>
	<li>The count of even digits in the number is equal to the count of odd digits.</li>
	<li>The number is divisible by <code>k</code>.</li>
</ul>

<p>Return <em>the number of beautiful integers in the range</em> <code>[low, high]</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> low = 10, high = 20, k = 3
<strong>Output:</strong> 2
<strong>Explanation:</strong> There are 2 beautiful integers in the given range: [12,18]. 
- 12 is beautiful because it contains 1 odd digit and 1 even digit, and is divisible by k = 3.
- 18 is beautiful because it contains 1 odd digit and 1 even digit, and is divisible by k = 3.
Additionally we can see that:
- 16 is not beautiful because it is not divisible by k = 3.
- 15 is not beautiful because it does not contain equal counts even and odd digits.
It can be shown that there are only 2 beautiful integers in the given range.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> low = 1, high = 10, k = 1
<strong>Output:</strong> 1
<strong>Explanation:</strong> There is 1 beautiful integer in the given range: [10].
- 10 is beautiful because it contains 1 odd digit and 1 even digit, and is divisible by k = 1.
It can be shown that there is only 1 beautiful integer in the given range.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> low = 5, high = 5, k = 2
<strong>Output:</strong> 0
<strong>Explanation:</strong> There are 0 beautiful integers in the given range.
- 5 is not beautiful because it is not divisible by k = 2 and it does not contain equal even and odd digits.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>0 &lt; low &lt;= high &lt;= 10<sup>9</sup></code></li>
	<li><code>0 &lt; k &lt;= 20</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n\*2n\*2<sup>2</sup>\*10k)</em>
- Space complexity: <em>O(n\*2n\*2<sup>2</sup>\*k)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} low
 * @param {number} high
 * @param {number} k
 * @return {number}
 */
const numberOfBeautifulIntegers = function (low, high, k) {
  const highStr = `${high}`;
  const n = highStr.length;
  const lowStr = `${low}`.padStart(n, '0');
  const dp = Array.from({ length: n }, () => {
    return new Array(k)
      .fill('')
      .map(() => {
        return new Array(n * 2)
          .fill('')
          .map(() => [
            [-1, -1],
            [-1, -1],
          ]);
      });
  });

  const getBeautifulCount = options => {
    const { index, remainder, balance, tight1, tight2, leadingZero } = options;

    if (index >= n) {
      return Number(balance === 0 && remainder === 0);
    }

    const t1 = Number(tight1);
    const t2 = Number(tight2);

    if (dp[index][remainder][balance + n][t1][t2] !== -1) {
      return dp[index][remainder][balance + n][t1][t2];
    }

    const start = tight1 ? Number(lowStr[index]) : 0;
    const end = tight2 ? Number(highStr[index]) : 9;
    let result = 0;

    for (let num = start; num <= end; num++) {
      const nextTight1 = tight1 && num === start;
      const nextTight2 = tight2 && num === end;
      const nextRemainder = (remainder * 10 + num) % k;
      const isEven = num % 2 === 0;
      const nextBalance = balance + (isEven ? Number(!leadingZero || num > 0) : -1);

      result += getBeautifulCount({
        index: index + 1,
        remainder: nextRemainder,
        balance: nextBalance,
        tight1: nextTight1,
        tight2: nextTight2,
        leadingZero: leadingZero && num === 0,
      });
    }

    dp[index][remainder][balance + n][t1][t2] = result;

    return result;
  };

  return getBeautifulCount({
    index: 0,
    remainder: 0,
    balance: 0,
    tight1: true,
    tight2: true,
    leadingZero: true,
  });
};
```
