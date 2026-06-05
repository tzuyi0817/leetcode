# [3753. Total Waviness of Numbers in Range II](https://leetcode.com/problems/total-waviness-of-numbers-in-range-ii)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given two integers <code>num1</code> and <code>num2</code> representing an <strong>inclusive</strong> range <code>[num1, num2]</code>.</p>

<p>The <strong>waviness</strong> of a number is defined as the total count of its <strong>peaks</strong> and <strong>valleys</strong>:</p>

<ul>
	<li>A digit is a <strong>peak</strong> if it is <strong>strictly greater</strong> than both of its immediate neighbors.</li>
	<li>A digit is a <strong>valley</strong> if it is <strong>strictly less</strong> than both of its immediate neighbors.</li>
	<li>The first and last digits of a number <strong>cannot</strong> be peaks or valleys.</li>
	<li>Any number with fewer than 3 digits has a waviness of 0.</li>
</ul>
Return the total sum of waviness for all numbers in the range <code>[num1, num2]</code>.
<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">num1 = 120, num2 = 130</span></p>

<p><strong>Output:</strong> <span class="example-io">3</span></p>

<p><strong>Explanation:</strong></p>

<p>In the range <code>[120, 130]</code>:</p>

<ul>
	<li><code>120</code>: middle digit 2 is a peak, waviness = 1.</li>
	<li><code>121</code>: middle digit 2 is a peak, waviness = 1.</li>
	<li><code>130</code>: middle digit 3 is a peak, waviness = 1.</li>
	<li>All other numbers in the range have a waviness of 0.</li>
</ul>

<p>Thus, total waviness is <code>1 + 1 + 1 = 3</code>.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">num1 = 198, num2 = 202</span></p>

<p><strong>Output:</strong> <span class="example-io">3</span></p>

<p><strong>Explanation:</strong></p>

<p>In the range <code>[198, 202]</code>:</p>

<ul>
	<li><code>198</code>: middle digit 9 is a peak, waviness = 1.</li>
	<li><code>201</code>: middle digit 0 is a valley, waviness = 1.</li>
	<li><code>202</code>: middle digit 0 is a valley, waviness = 1.</li>
	<li>All other numbers in the range have a waviness of 0.</li>
</ul>

<p>Thus, total waviness is <code>1 + 1 + 1 = 3</code>.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">num1 = 4848, num2 = 4848</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<p>Number <code>4848</code>: the second digit 8 is a peak, and the third digit 4 is a valley, giving a waviness of 2.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= num1 &lt;= num2 &lt;= 10<sup>15</sup></code>​​​​​​​</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(log(num2)\*1010)</em>
- Space complexity: <em>O(log(num2)\*100)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
const totalWaviness = function (num1, num2) {
  const getWaviness = num => {
    if (num < 100) return 0;

    const target = `${num}`;
    const n = target.length;

    const dp = Array.from({ length: n }, () => {
      return new Array(100).fill(-1);
    });

    const getNextWaviness = (index, prev1, prev2, started, tight) => {
      if (index >= n) return { count: 1, waviness: 0 };

      const isValidPrev = started && prev1 !== -1 && prev2 !== -1;
      const prevKey = 10 * prev1 + prev2;

      if (isValidPrev && !tight && dp[index][prevKey] !== -1) {
        return dp[index][prevKey];
      }

      const limit = tight ? Number(target[index]) : 9;
      const result = { count: 0, waviness: 0 };

      for (let current = 0; current <= limit; current++) {
        const nextTight = tight && current === limit;

        if (!started && !current) {
          const next = getNextWaviness(index + 1, -1, -1, false, nextTight);

          result.count += next.count;
          result.waviness += next.waviness;
        } else {
          const isPeaks = current < prev2 && prev1 < prev2;
          const isValleys = current > prev2 && prev1 > prev2;
          const isWaviness = isValidPrev && (isPeaks || isValleys);
          const next = getNextWaviness(index + 1, prev2, current, true, nextTight);

          result.count += next.count;
          result.waviness += next.waviness + (isWaviness ? next.count : 0);
        }
      }

      if (isValidPrev && !tight) {
        dp[index][prevKey] = result;
      }

      return result;
    };

    return getNextWaviness(0, -1, -1, false, true).waviness;
  };

  return getWaviness(num2) - getWaviness(num1 - 1);
};
```
