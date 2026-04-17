# [2719. Count of Integers](https://leetcode.com/problems/count-of-integers)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given two numeric strings <code>num1</code> and <code>num2</code> and two integers <code>max_sum</code> and <code>min_sum</code>. We denote an integer <code>x</code> to be <em>good</em> if:</p>

<ul>
	<li><code>num1 &lt;= x &lt;= num2</code></li>
	<li><code>min_sum &lt;= digit_sum(x) &lt;= max_sum</code>.</li>
</ul>

<p>Return <em>the number of good integers</em>. Since the answer may be large, return it modulo <code>10<sup>9</sup> + 7</code>.</p>

<p>Note that <code>digit_sum(x)</code> denotes the sum of the digits of <code>x</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> num1 = "1", num2 = "12", <code>min_sum</code> = 1, max_sum = 8
<strong>Output:</strong> 11
<strong>Explanation:</strong> There are 11 integers whose sum of digits lies between 1 and 8 are 1,2,3,4,5,6,7,8,10,11, and 12. Thus, we return 11.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> num1 = "1", num2 = "5", <code>min_sum</code> = 1, max_sum = 5
<strong>Output:</strong> 5
<strong>Explanation:</strong> The 5 integers whose sum of digits lies between 1 and 5 are 1,2,3,4, and 5. Thus, we return 5.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= num1 &lt;= num2 &lt;= 10<sup>22</sup></code></li>
	<li><code>1 &lt;= min_sum &lt;= max_sum &lt;= 400</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n\*max_sum\*2<sup>2</sup>\*10)</em>
- Space complexity: <em>O(n\*max_sum\*2<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} num1
 * @param {string} num2
 * @param {number} min_sum
 * @param {number} max_sum
 * @return {number}
 */
const MODULO = 10 ** 9 + 7;

const count = function (num1, num2, min_sum, max_sum) {
  const n = num2.length;
  const num1Padded = num1.padStart(n, '0');
  const maxCount = solveForSum(num1Padded, num2, n, max_sum);
  const minCount = solveForSum(num1Padded, num2, n, min_sum - 1);

  return (maxCount - minCount + MODULO) % MODULO;
};

function getCountRecursive(index, sum, minTight, maxTight, config) {
  if (sum < 0) return 0;
  if (index === config.n) return 1;

  const t1 = minTight ? 1 : 0;
  const t2 = maxTight ? 1 : 0;
  const key = ((index * (config.maxSum + 1) + sum) * 2 + t1) * 2 + t2;

  if (config.dp[key] !== -1) return config.dp[key];

  const minNum = minTight ? Number(config.num1[index]) : 0;
  const maxNum = maxTight ? Number(config.num2[index]) : 9;
  let result = 0;

  for (let d = minNum; d <= maxNum; d++) {
    const nextMinTight = minTight && d === minNum;
    const nextMaxTight = maxTight && d === maxNum;

    const count = getCountRecursive(index + 1, sum - d, nextMinTight, nextMaxTight, config);
    result = (result + count) % MODULO;
  }

  config.dp[key] = result;

  return result;
}

function solveForSum(num1, num2, n, maxSum) {
  if (maxSum < 0) return 0;

  const dpSize = n * (maxSum + 1) * 2 * 2;
  const config = {
    num1,
    num2,
    n,
    maxSum,
    dp: new Int32Array(dpSize).fill(-1),
  };

  return getCountRecursive(0, maxSum, true, true, config);
}
```
