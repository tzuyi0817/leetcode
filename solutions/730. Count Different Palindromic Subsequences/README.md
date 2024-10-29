# [730. Count Different Palindromic Subsequences](https://leetcode.com/problems/count-different-palindromic-subsequences)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a string s, return <em>the number of different non-empty palindromic subsequences in</em> <code>s</code>. Since the answer may be very large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>A subsequence of a string is obtained by deleting zero or more characters from the string.</p>

<p>A sequence is palindromic if it is equal to the sequence reversed.</p>

<p>Two sequences <code>a<sub>1</sub>, a<sub>2</sub>, ...</code> and <code>b<sub>1</sub>, b<sub>2</sub>, ...</code> are different if there is some <code>i</code> for which <code>a<sub>i</sub> != b<sub>i</sub></code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "bccb"
<strong>Output:</strong> 6
<strong>Explanation:</strong> The 6 different non-empty palindromic subsequences are 'b', 'c', 'bb', 'cc', 'bcb', 'bccb'.
Note that 'bcb' is counted only once, even though it occurs twice.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "abcdabcdabcdabcdabcdabcdabcdabcddcbadcbadcbadcbadcbadcbadcbadcba"
<strong>Output:</strong> 104860361
<strong>Explanation:</strong> There are 3104860382 different non-empty palindromic subsequences, which is 104860361 modulo 10<sup>9</sup> + 7.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 1000</code></li>
	<li><code>s[i]</code> is either <code>'a'</code>, <code>'b'</code>, <code>'c'</code>, or <code>'d'</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n<sup>2</sup>logn)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
const countPalindromicSubsequences = function (s) {
  const MODULO = 10 ** 9 + 7;
  const BASE_CODE = 'a'.charCodeAt(0);
  const CHARS_COUNT = 4;
  const n = s.length;
  const chars = Array.from({length: CHARS_COUNT})
    .fill('')
    .map(_ => []);
  const memo = new Array(n)
    .fill('')
    .map(_ => new Array(n).fill(0));

  for (let index = 0; index < n; index++) {
    const code = s[index].charCodeAt(0) - BASE_CODE;

    chars[code].push(index);
  }

  const binarySearch = (arr, target) => {
    let left = 0;
    let right = arr.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      arr[mid] >= target ? (right = mid) : (left = mid + 1);
    }
    return left;
  };

  const countPalindromic = (left, right) => {
    if (left > right) return 0;
    if (memo[left][right]) return memo[left][right];

    let result = 0;

    for (let index = 0; index < CHARS_COUNT; index++) {
      const charIndices = chars[index];

      if (!charIndices.length) continue;
      const charLeft = binarySearch(charIndices, left);

      if (charLeft === charIndices.length) continue;
      if (charIndices[charLeft] > right) continue;
      const charRight = binarySearch(charIndices, right + 1) - 1;

      result += charLeft === charRight ? 1 : 2;
      result += countPalindromic(charIndices[charLeft] + 1, charIndices[charRight] - 1);
      result %= MODULO;
    }
    return (memo[left][right] = result);
  };

  return countPalindromic(0, n - 1);
};
```
