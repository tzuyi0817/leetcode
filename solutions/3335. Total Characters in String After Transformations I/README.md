# [3335. Total Characters in String After Transformations I](https://leetcode.com/problems/total-characters-in-string-after-transformations-i)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a string <code>s</code> and an integer <code>t</code>, representing the number of <strong>transformations</strong> to perform. In one <strong>transformation</strong>, every character in <code>s</code> is replaced according to the following rules:</p>

<ul>
	<li>If the character is <code>'z'</code>, replace it with the string <code>"ab"</code>.</li>
	<li>Otherwise, replace it with the <strong>next</strong> character in the alphabet. For example, <code>'a'</code> is replaced with <code>'b'</code>, <code>'b'</code> is replaced with <code>'c'</code>, and so on.</li>
</ul>

<p>Return the <strong>length</strong> of the resulting string after <strong>exactly</strong> <code>t</code> transformations.</p>

<p>Since the answer may be very large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "abcyy", t = 2</span></p>

<p><strong>Output:</strong> <span class="example-io">7</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li><strong>First Transformation (t = 1)</strong>:
    <ul>
    	<li><code>'a'</code> becomes <code>'b'</code></li>
    	<li><code>'b'</code> becomes <code>'c'</code></li>
    	<li><code>'c'</code> becomes <code>'d'</code></li>
    	<li><code>'y'</code> becomes <code>'z'</code></li>
    	<li><code>'y'</code> becomes <code>'z'</code></li>
    	<li>String after the first transformation: <code>"bcdzz"</code></li>
    </ul>
    </li>
    <li><strong>Second Transformation (t = 2)</strong>:
    <ul>
    	<li><code>'b'</code> becomes <code>'c'</code></li>
    	<li><code>'c'</code> becomes <code>'d'</code></li>
    	<li><code>'d'</code> becomes <code>'e'</code></li>
    	<li><code>'z'</code> becomes <code>"ab"</code></li>
    	<li><code>'z'</code> becomes <code>"ab"</code></li>
    	<li>String after the second transformation: <code>"cdeabab"</code></li>
    </ul>
    </li>
    <li><strong>Final Length of the string</strong>: The string is <code>"cdeabab"</code>, which has 7 characters.</li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "azbk", t = 1</span></p>

<p><strong>Output:</strong> <span class="example-io">5</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li><strong>First Transformation (t = 1)</strong>:
    <ul>
    	<li><code>'a'</code> becomes <code>'b'</code></li>
    	<li><code>'z'</code> becomes <code>"ab"</code></li>
    	<li><code>'b'</code> becomes <code>'c'</code></li>
    	<li><code>'k'</code> becomes <code>'l'</code></li>
    	<li>String after the first transformation: <code>"babcl"</code></li>
    </ul>
    </li>
    <li><strong>Final Length of the string</strong>: The string is <code>"babcl"</code>, which has 5 characters.</li>
</ul>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code> consists only of lowercase English letters.</li>
	<li><code>1 &lt;= t &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n+t)</em>
- Space complexity: <em>O(t)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {number} t
 * @return {number}
 */
const lengthAfterTransformations = function (s, t) {
  const MODULO = BigInt(10 ** 9 + 7);
  const BASE_CODE = 'a'.charCodeAt(0);
  const memo = new Map();
  let result = 0n;

  const getTransformCharSize = code => {
    if (code < 26) return 1n;
    if (memo.has(code)) return memo.get(code);
    const nextT = code - 26;
    const a = getTransformCharSize(0 + nextT);
    const b = getTransformCharSize(1 + nextT);
    const total = (a + b) % MODULO;

    memo.set(code, total);

    return total;
  };

  for (const char of s) {
    const code = char.charCodeAt(0) - BASE_CODE;
    const length = getTransformCharSize(code + t);

    result = (result + length) % MODULO;
  }

  return Number(result);
};
```
