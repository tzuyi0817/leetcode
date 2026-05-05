# [2801. Count Stepping Numbers in Range](https://leetcode.com/problems/count-stepping-numbers-in-range)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>Given two positive integers <code>low</code> and <code>high</code> represented as strings, find the count of <strong>stepping numbers</strong> in the inclusive range <code>[low, high]</code>.</p>

<p>A <strong>stepping number</strong> is an integer such that all of its adjacent digits have an absolute difference of <strong>exactly</strong> <code>1</code>.</p>

<p>Return <em>an integer denoting the count of stepping numbers in the inclusive range</em> <code>[low, high]</code><em>. </em></p>

<p>Since the answer may be very large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p><strong>Note:</strong> A stepping number should not have a leading zero.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> low = "1", high = "11"
<strong>Output:</strong> 10
<strong>Explanation: </strong>The stepping numbers in the range [1,11] are 1, 2, 3, 4, 5, 6, 7, 8, 9 and 10. There are a total of 10 stepping numbers in the range. Hence, the output is 10.</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> low = "90", high = "101"
<strong>Output:</strong> 2
<strong>Explanation: </strong>The stepping numbers in the range [90,101] are 98 and 101. There are a total of 2 stepping numbers in the range. Hence, the output is 2. </pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= int(low) &lt;= int(high) &lt; 10<sup>100</sup></code></li>
	<li><code>1 &lt;= low.length, high.length &lt;= 100</code></li>
	<li><code>low</code> and <code>high</code> consist of only digits.</li>
	<li><code>low</code> and <code>high</code> don't have any leading zeros.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(10<sup>2</sup>\*2<sup>2</sup>\*n)</em>
- Space complexity: <em>O(10\*2<sup>2</sup>\*n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} low
 * @param {string} high
 * @return {number}
 */
const countSteppingNumbers = function (low, high) {
  const n = high.length;
  const leadingZeroLow = low.padStart(n, '0');
  const MODULO = 10 ** 9 + 7;
  const dp = Array.from({ length: n }, () => {
    return new Array(10)
      .fill('')
      .map(() =>
        new Array(2)
          .fill('')
          .map(() => {
            return new Array(2).fill(-1);
          }),
      );
  });

  const getSteppingCount = (index, prev, tight1, tight2, leadingZero) => {
    if (index >= n) return 1;

    const t1 = Number(tight1);
    const t2 = Number(tight2);

    if (dp[index][prev][t1][t2] !== -1) {
      return dp[index][prev][t1][t2];
    }

    const start = tight1 ? Number(leadingZeroLow[index]) : 0;
    const end = tight2 ? Number(high[index]) : 9;
    let result = 0;

    for (let num = start; num <= end; num++) {
      const nextTight1 = tight1 && num === start;
      const nextTight2 = tight2 && num === end;
      const nextLeadingZero = leadingZero && num === 0;

      if (leadingZero) {
        result += getSteppingCount(index + 1, num, nextTight1, nextTight2, nextLeadingZero);
      } else if (Math.abs(num - prev) === 1) {
        result += getSteppingCount(index + 1, num, nextTight1, nextTight2, false);
      }

      result = result % MODULO;
    }

    dp[index][prev][t1][t2] = result;

    return result;
  };

  return getSteppingCount(0, 0, true, true, true);
};
```
