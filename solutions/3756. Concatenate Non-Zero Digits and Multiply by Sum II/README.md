# [3756. Concatenate Non-Zero Digits and Multiply by Sum II](https://leetcode.com/problems/concatenate-non-zero-digits-and-multiply-by-sum-ii)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given a string <code>s</code> of length <code>m</code> consisting of digits. You are also given a 2D integer array <code>queries</code>, where <code>queries[i] = [l<sub>i</sub>, r<sub>i</sub>]</code>.</p>

<p>For each <code>queries[i]</code>, extract the <strong><span data-keyword="substring-nonempty" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_1l_" data-state="closed" class="">substring</button></span></strong> <code>s[l<sub>i</sub>..r<sub>i</sub>]</code>. Then, perform the following:</p>

<ul>
	<li>Form a new integer <code>x</code> by concatenating all the <strong>non-zero digits</strong> from the substring in their original order. If there are no non-zero digits, <code>x = 0</code>.</li>
	<li>Let <code>sum</code> be the <strong>sum of digits</strong> in <code>x</code>. The answer is <code>x * sum</code>.</li>
</ul>

<p>Return an array of integers <code>answer</code> where <code>answer[i]</code> is the answer to the <code>i<sup>th</sup></code> query.</p>

<p>Since the answers may be very large, return them <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "10203004", queries = [[0,7],[1,3],[4,6]]</span></p>

<p><strong>Output:</strong> <span class="example-io">[12340, 4, 9]</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li><code>s[0..7] = "10203004"</code>
    <ul>
    	<li><code>x = 1234</code></li>
    	<li><code>sum = 1 + 2 + 3 + 4 = 10</code></li>
    	<li>Therefore, answer is <code>1234 * 10 = 12340</code>.</li>
    </ul>
    </li>
    <li><code>s[1..3] = "020"</code>
    <ul>
    	<li><code>x = 2</code></li>
    	<li><code>sum = 2</code></li>
    	<li>Therefore, the answer is <code>2 * 2 = 4</code>.</li>
    </ul>
    </li>
    <li><code>s[4..6] = "300"</code>
    <ul>
    	<li><code>x = 3</code></li>
    	<li><code>sum = 3</code></li>
    	<li>Therefore, the answer is <code>3 * 3 = 9</code>.</li>
    </ul>
  </li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "1000", queries = [[0,3],[1,1]]</span></p>

<p><strong>Output:</strong> <span class="example-io">[1, 0]</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li><code>s[0..3] = "1000"</code>
    <ul>
    	<li><code>x = 1</code></li>
    	<li><code>sum = 1</code></li>
    	<li>Therefore, the answer is <code>1 * 1 = 1</code>.</li>
    </ul>
    </li>
    <li><code>s[1..1] = "0"</code>
    <ul>
    	<li><code>x = 0</code></li>
    	<li><code>sum = 0</code></li>
    	<li>Therefore, the answer is <code>0 * 0 = 0</code>.</li>
    </ul>
  </li>
</ul>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "9876543210", queries = [[0,9]]</span></p>

<p><strong>Output:</strong> <span class="example-io">[444444137]</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li><code>s[0..9] = "9876543210"</code>
    <ul>
    	<li><code>x = 987654321</code></li>
    	<li><code>sum = 9 + 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1 = 45</code></li>
    	<li>Therefore, the answer is <code>987654321 * 45 = 44444444445</code>.</li>
    	<li>We return <code>44444444445 modulo (10<sup>9</sup> + 7) = 444444137</code>.</li>
    </ul>
  </li>
</ul>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= m == s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code> consists of digits only.</li>
	<li><code>1 &lt;= queries.length &lt;= 10<sup>5</sup></code></li>
	<li><code>queries[i] = [l<sub>i</sub>, r<sub>i</sub>]</code></li>
	<li><code>0 &lt;= l<sub>i</sub> &lt;= r<sub>i</sub> &lt; m</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Prefix Sum`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {number[]}
 */
const sumAndMultiply = function (s, queries) {
  const n = s.length;
  const MODULO = BigInt(10 ** 9 + 7);
  const power10 = Array.from({ length: n + 1 }, () => 1n);
  const prefixInteger = Array.from({ length: n + 1 }, () => 0n);
  const prefixSum = Array.from({ length: n + 1 }, () => 0n);

  for (let index = 1; index <= n; index++) {
    const digit = BigInt(s[index - 1]);
    const power = digit ? 10n : 1n;

    power10[index] = (power10[index - 1] * power) % MODULO;
    prefixInteger[index] = (prefixInteger[index - 1] * power + digit) % MODULO;
    prefixSum[index] = (prefixSum[index - 1] + digit) % MODULO;
  }

  return queries.map(([l, r]) => {
    const inv = modPow(power10[l], MODULO - 2n, MODULO);
    const power = (power10[r + 1] * inv) % MODULO;
    const prevInteger = (prefixInteger[l] * power) % MODULO;
    const integer = (prefixInteger[r + 1] - prevInteger + MODULO) % MODULO;
    const sum = prefixSum[r + 1] - prefixSum[l];

    return Number((integer * sum) % MODULO);
  });
};

function modPow(base, exp, mod) {
  let result = 1n;

  while (exp) {
    if (exp % 2n) {
      result = (result * base) % mod;
    }

    base = (base * base) % mod;
    exp /= 2n;
  }

  return result;
}
```
