# [3130. Find All Possible Stable Binary Arrays II](https://leetcode.com/problems/find-all-possible-stable-binary-arrays-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given 3 positive integers <code>zero</code>, <code>one</code>, and <code>limit</code>.</p>

<p>A <span data-keyword="binary-array" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r1l:" data-state="closed" class="">binary array</button></span> <code>arr</code> is called <strong>stable</strong> if:</p>

<ul>
	<li>The number of occurrences of 0 in <code>arr</code> is <strong>exactly </strong><code>zero</code>.</li>
	<li>The number of occurrences of 1 in <code>arr</code> is <strong>exactly</strong> <code>one</code>.</li>
	<li>Each <span data-keyword="subarray-nonempty" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r1m:" data-state="closed" class="">subarray</button></span> of <code>arr</code> with a size greater than <code>limit</code> must contain <strong>both </strong>0 and 1.</li>
</ul>

<p>Return the <em>total</em> number of <strong>stable</strong> binary arrays.</p>

<p>Since the answer may be very large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">zero = 1, one = 1, limit = 2</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<p>The two possible stable binary arrays are <code>[1,0]</code> and <code>[0,1]</code>.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">zero = 1, one = 2, limit = 1</span></p>

<p><strong>Output:</strong> <span class="example-io">1</span></p>

<p><strong>Explanation:</strong></p>

<p>The only possible stable binary array is <code>[1,0,1]</code>.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">zero = 3, one = 3, limit = 2</span></p>

<p><strong>Output:</strong> <span class="example-io">14</span></p>

<p><strong>Explanation:</strong></p>

<p>All the possible stable binary arrays are <code>[0,0,1,0,1,1]</code>, <code>[0,0,1,1,0,1]</code>, <code>[0,1,0,0,1,1]</code>, <code>[0,1,0,1,0,1]</code>, <code>[0,1,0,1,1,0]</code>, <code>[0,1,1,0,0,1]</code>, <code>[0,1,1,0,1,0]</code>, <code>[1,0,0,1,0,1]</code>, <code>[1,0,0,1,1,0]</code>, <code>[1,0,1,0,0,1]</code>, <code>[1,0,1,0,1,0]</code>, <code>[1,0,1,1,0,0]</code>, <code>[1,1,0,0,1,0]</code>, and <code>[1,1,0,1,0,0]</code>.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= zero, one, limit &lt;= 1000</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(zero\*one)</em>
- Space complexity: <em>O(zero\*one)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} zero
 * @param {number} one
 * @param {number} limit
 * @return {number}
 */
const numberOfStableArrays = function (zero, one, limit) {
  const MODULO = 10 ** 9 + 7;
  const dp = Array.from({ length: zero + 1 }, () => {
    return new Array(one + 1).fill('').map(() => new Array(2).fill(-1));
  });

  const getStableCount = (zeros, ones, last) => {
    if (zeros === 0) {
      return last === 0 || ones > limit ? 0 : 1;
    }

    if (ones === 0) {
      return last === 1 || zeros > limit ? 0 : 1;
    }

    if (dp[zeros][ones][last] !== -1) {
      return dp[zeros][ones][last];
    }

    let result = 0;

    if (last === 0) {
      const lastZeroCount = getStableCount(zeros - 1, ones, 0);
      const lastOneCount = getStableCount(zeros - 1, ones, 1);

      result = (lastZeroCount + lastOneCount) % MODULO;

      if (zeros > limit) {
        const raceCount = getStableCount(zeros - limit - 1, ones, 1);

        result = (result - raceCount + MODULO) % MODULO;
      }
    } else {
      const lastZeroCount = getStableCount(zeros, ones - 1, 0);
      const lastOneCount = getStableCount(zeros, ones - 1, 1);

      result = (lastZeroCount + lastOneCount) % MODULO;

      if (ones > limit) {
        const raceCount = getStableCount(zeros, ones - limit - 1, 0);

        result = (result - raceCount + MODULO) % MODULO;
      }
    }

    dp[zeros][ones][last] = result;

    return result;
  };

  const lastZeroCount = getStableCount(zero, one, 0);
  const lastOneCount = getStableCount(zero, one, 1);

  return (lastZeroCount + lastOneCount) % MODULO;
};
```
