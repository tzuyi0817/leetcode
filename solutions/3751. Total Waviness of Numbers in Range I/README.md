# [3751. Total Waviness of Numbers in Range I](https://leetcode.com/problems/total-waviness-of-numbers-in-range-i)

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
In the range <code>[120, 130]</code>:

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
In the range <code>[198, 202]</code>:

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
	<li><code>1 &lt;= num1 &lt;= num2 &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Simulation`**

- Time complexity: <em>O(6n -> n)</em>
  - n is `num2 - num1 + 1`
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
const totalWaviness = function (num1, num2) {
  const start = Math.max(num1, 100);
  const end = Math.max(num2, 100);
  let result = 0;

  const getWaviness = num => {
    const target = `${num}`;
    const n = target.length;
    let waviness = 0;

    for (let index = 1; index < n - 1; index++) {
      const current = target[index];
      const prev = target[index - 1];
      const next = target[index + 1];

      if (current < prev && current < next) {
        waviness += 1;
      }

      if (current > prev && current > next) {
        waviness += 1;
      }
    }

    return waviness;
  };

  for (let num = start; num <= end; num++) {
    result += getWaviness(num);
  }

  return result;
};
```
