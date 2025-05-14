# [3337. Total Characters in String After Transformations II](https://leetcode.com/problems/total-characters-in-string-after-transformations-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a string <code>s</code> consisting of lowercase English letters, an integer <code>t</code> representing the number of <strong>transformations</strong> to perform, and an array <code>nums</code> of size 26. In one <strong>transformation</strong>, every character in <code>s</code> is replaced according to the following rules:</p>

<ul>
	<li>Replace <code>s[i]</code> with the <strong>next</strong> <code>nums[s[i] - 'a']</code> consecutive characters in the alphabet. For example, if <code>s[i] = 'a'</code> and <code>nums[0] = 3</code>, the character <code>'a'</code> transforms into the next 3 consecutive characters ahead of it, which results in <code>"bcd"</code>.</li>
	<li>The transformation <strong>wraps</strong> around the alphabet if it exceeds <code>'z'</code>. For example, if <code>s[i] = 'y'</code> and <code>nums[24] = 3</code>, the character <code>'y'</code> transforms into the next 3 consecutive characters ahead of it, which results in <code>"zab"</code>.</li>
</ul>

<p>Return the length of the resulting string after <strong>exactly</strong> <code>t</code> transformations.</p>

<p>Since the answer may be very large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "abcyy", t = 2, nums = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2]</span></p>

<p><strong>Output:</strong> <span class="example-io">7</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>
	<p><strong>First Transformation (t = 1):</strong></p>
    <ul>
    	<li><code>'a'</code> becomes <code>'b'</code> as <code>nums[0] == 1</code></li>
    	<li><code>'b'</code> becomes <code>'c'</code> as <code>nums[1] == 1</code></li>
    	<li><code>'c'</code> becomes <code>'d'</code> as <code>nums[2] == 1</code></li>
    	<li><code>'y'</code> becomes <code>'z'</code> as <code>nums[24] == 1</code></li>
    	<li><code>'y'</code> becomes <code>'z'</code> as <code>nums[24] == 1</code></li>
    	<li>String after the first transformation: <code>"bcdzz"</code></li>
    </ul>
    </li>
    <li>
    <p><strong>Second Transformation (t = 2):</strong></p>
    <ul>
    	<li><code>'b'</code> becomes <code>'c'</code> as <code>nums[1] == 1</code></li>
    	<li><code>'c'</code> becomes <code>'d'</code> as <code>nums[2] == 1</code></li>
    	<li><code>'d'</code> becomes <code>'e'</code> as <code>nums[3] == 1</code></li>
    	<li><code>'z'</code> becomes <code>'ab'</code> as <code>nums[25] == 2</code></li>
    	<li><code>'z'</code> becomes <code>'ab'</code> as <code>nums[25] == 2</code></li>
    	<li>String after the second transformation: <code>"cdeabab"</code></li>
    </ul>
    </li>
    <li>
    <p><strong>Final Length of the string:</strong> The string is <code>"cdeabab"</code>, which has 7 characters.</p>
    </li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "azbk", t = 1, nums = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]</span></p>

<p><strong>Output:</strong> <span class="example-io">8</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>
	<p><strong>First Transformation (t = 1):</strong></p>
    <ul>
    	<li><code>'a'</code> becomes <code>'bc'</code> as <code>nums[0] == 2</code></li>
    	<li><code>'z'</code> becomes <code>'ab'</code> as <code>nums[25] == 2</code></li>
    	<li><code>'b'</code> becomes <code>'cd'</code> as <code>nums[1] == 2</code></li>
    	<li><code>'k'</code> becomes <code>'lm'</code> as <code>nums[10] == 2</code></li>
    	<li>String after the first transformation: <code>"bcabcdlm"</code></li>
    </ul>
    </li>
    <li>
    <p><strong>Final Length of the string:</strong> The string is <code>"bcabcdlm"</code>, which has 8 characters.</p>
    </li>
</ul>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code> consists only of lowercase English letters.</li>
	<li><code>1 &lt;= t &lt;= 10<sup>9</sup></code></li>
	<li><code><font face="monospace">nums.length == 26</font></code></li>
	<li><code><font face="monospace">1 &lt;= nums[i] &lt;= 25</font></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n+26<sup>2</sup>+26<sup>3</sup>logt -> n+logt)</em>
- Space complexity: <em>O(26<sup>2</sup>+26 -> 1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {number} t
 * @param {number[]} nums
 * @return {number}
 */
const lengthAfterTransformations = function (s, t, nums) {
  const MODULO = BigInt(10 ** 9 + 7);
  const BASE_CODE = 'a'.charCodeAt(0);
  const transformations = Array.from({ length: 26 }, () => new Array(26).fill(0n));

  for (let letter = 0; letter < 26; letter++) {
    for (let step = 1; step <= nums[letter]; step++) {
      const transform = (letter + step) % 26;

      transformations[letter][transform] += 1n;
    }
  }

  const matrixMult = (matrixA, matrixB) => {
    const n = matrixA.length;
    const result = new Array(26)
      .fill('')
      .map(_ => new Array(26).fill(0n));

    for (let a = 0; a < n; a++) {
      for (let b = 0; b < n; b++) {
        for (let k = 0; k < n; k++) {
          const multiple = matrixA[a][k] * matrixB[k][b];

          result[a][b] = (result[a][b] + multiple) % MODULO;
        }
      }
    }

    return result;
  };

  const matrixPow = (matrix, power) => {
    if (!power) {
      const n = matrix.length;
      const result = new Array(n)
        .fill('')
        .map(_ => new Array(n).fill(0n));

      for (let index = 0; index < n; index++) {
        result[index][index] = 1n;
      }

      return result;
    }

    if (power % 2) {
      return matrixMult(matrix, matrixPow(matrix, power - 1));
    }
    const halfMatrix = matrixPow(matrix, power / 2);

    return matrixMult(halfMatrix, halfMatrix);
  };

  const poweredTransformations = matrixPow(transformations, t);
  const counts = Array.from({ length: 26 }, () => 0n);
  const lengths = Array.from({ length: 26 }, () => 0n);

  for (const letter of s) {
    const code = letter.charCodeAt(0) - BASE_CODE;

    counts[code] += 1n;
  }

  for (let a = 0; a < 26; a++) {
    for (let b = 0; b < 26; b++) {
      lengths[a] = (lengths[a] + counts[a] * poweredTransformations[a][b]) % MODULO;
    }
  }

  return Number(lengths.reduce((result, length) => (result + length) % MODULO));
};
```
