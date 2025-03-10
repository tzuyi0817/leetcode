# [1449. Form Largest Integer With Digits That Add up to Target](https://leetcode.com/problems/form-largest-integer-with-digits-that-add-up-to-target)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an array of integers <code>cost</code> and an integer <code>target</code>, return <em>the <strong>maximum</strong> integer you can paint under the following rules</em>:</p>

<ul>
	<li>The cost of painting a digit <code>(i + 1)</code> is given by <code>cost[i]</code> (<strong>0-indexed</strong>).</li>
	<li>The total cost used must be equal to <code>target</code>.</li>
	<li>The integer does not have <code>0</code> digits.</li>
</ul>

<p>Since the answer may be very large, return it as a string. If there is no way to paint any integer given the condition, return <code>"0"</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> cost = [4,3,2,5,6,7,2,5,5], target = 9
<strong>Output:</strong> "7772"
<strong>Explanation:</strong> The cost to paint the digit '7' is 2, and the digit '2' is 3. Then cost("7772") = 2*3+ 3*1 = 9. You could also paint "977", but "7772" is the largest number.
<strong>Digit    cost</strong>
  1  -&gt;   4
  2  -&gt;   3
  3  -&gt;   2
  4  -&gt;   5
  5  -&gt;   6
  6  -&gt;   7
  7  -&gt;   2
  8  -&gt;   5
  9  -&gt;   5
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> cost = [7,6,5,5,5,6,8,7,8], target = 12
<strong>Output:</strong> "85"
<strong>Explanation:</strong> The cost to paint the digit '8' is 7, and the digit '5' is 5. Then cost("85") = 7 + 5 = 12.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> cost = [2,4,6,2,4,6,4,4,4], target = 5
<strong>Output:</strong> "0"
<strong>Explanation:</strong> It is impossible to paint any integer with total cost equal to target.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>cost.length == 9</code></li>
	<li><code>1 &lt;= cost[i], target &lt;= 5000</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n\*target)</em>
- Space complexity: <em>O(target)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} cost
 * @param {number} target
 * @return {string}
 */
const largestNumber = function (cost, target) {
  const n = cost.length;
  const dp = Array.from({ length: target + 1 }, () => '');

  const paintDigit = spendCost => {
    if (spendCost === target) return '';
    if (dp[spendCost] !== '') return dp[spendCost];
    let result = '0';

    for (let index = n - 1; index >= 0; index--) {
      const nextCost = spendCost + cost[index];

      if (nextCost > target) continue;
      const nextInteger = paintDigit(nextCost);

      if (nextInteger === '0') continue;
      const digit = `${index + 1}`;
      const integer = `${digit}${nextInteger}`;

      if (integer.length < result.length) continue;
      if (integer.length === result.length && integer <= result) continue;

      result = integer;
    }

    dp[spendCost] = result;

    return result;
  };

  return paintDigit(0);
};
```
