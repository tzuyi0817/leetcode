# [2466. Count Ways To Build Good Strings](https://leetcode.com/problems/count-ways-to-build-good-strings)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given the integers <code>zero</code>, <code>one</code>, <code>low</code>, and <code>high</code>, we can construct a string by starting with an empty string, and then at each step perform either of the following:</p>

<ul>
	<li>Append the character <code>'0'</code> <code>zero</code> times.</li>
	<li>Append the character <code>'1'</code> <code>one</code> times.</li>
</ul>

<p>This can be performed any number of times.</p>

<p>A <strong>good</strong> string is a string constructed by the above process having a <strong>length</strong> between <code>low</code> and <code>high</code> (<strong>inclusive</strong>).</p>

<p>Return <em>the number of <strong>different</strong> good strings that can be constructed satisfying these properties.</em> Since the answer can be large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> low = 3, high = 3, zero = 1, one = 1
<strong>Output:</strong> 8
<strong>Explanation:</strong> 
One possible valid good string is "011". 
It can be constructed as follows: "" -&gt; "0" -&gt; "01" -&gt; "011". 
All binary strings from "000" to "111" are good strings in this example.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> low = 2, high = 3, zero = 1, one = 2
<strong>Output:</strong> 5
<strong>Explanation:</strong> The good strings are "00", "11", "000", "110", and "011".
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= low&nbsp;&lt;= high&nbsp;&lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= zero, one &lt;= low</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(high)</em>
- Space complexity: <em>O(high)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} low
 * @param {number} high
 * @param {number} zero
 * @param {number} one
 * @return {number}
 */
const countGoodStrings = function (low, high, zero, one) {
  const MODULO = 10 ** 9 + 7;
  const dp = Array.from({ length: high + 1 }, () => 0);
  let result = 0;

  dp[0] = 1;

  for (let length = 1; length <= high; length++) {
    if (length >= zero) {
      dp[length] = (dp[length] + dp[length - zero]) % MODULO;
    }
    if (length >= one) {
      dp[length] = (dp[length] + dp[length - one]) % MODULO;
    }
    if (length < low) continue;
    result = (result + dp[length]) % MODULO;
  }
  return result;
};
```
