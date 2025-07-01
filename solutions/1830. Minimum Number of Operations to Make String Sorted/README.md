# [1830. Minimum Number of Operations to Make String Sorted](https://leetcode.com/problems/minimum-number-of-operations-to-make-string-sorted)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a string <code>s</code> (<strong>0-indexed</strong>)​​​​​​. You are asked to perform the following operation on <code>s</code>​​​​​​ until you get a sorted string:</p>

<ol>
	<li>Find <strong>the largest index</strong> <code>i</code> such that <code>1 &lt;= i &lt; s.length</code> and <code>s[i] &lt; s[i - 1]</code>.</li>
	<li>Find <strong>the largest index</strong> <code>j</code> such that <code>i &lt;= j &lt; s.length</code> and <code>s[k] &lt; s[i - 1]</code> for all the possible values of <code>k</code> in the range <code>[i, j]</code> inclusive.</li>
	<li>Swap the two characters at indices <code>i - 1</code>​​​​ and <code>j</code>​​​​​.</li>
	<li>Reverse the suffix starting at index <code>i</code>​​​​​​.</li>
</ol>

<p>Return <em>the number of operations needed to make the string sorted.</em> Since the answer can be too large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "cba"
<strong>Output:</strong> 5
<strong>Explanation:</strong> The simulation goes as follows:
Operation 1: i=2, j=2. Swap s[1] and s[2] to get s="cab", then reverse the suffix starting at 2. Now, s="cab".
Operation 2: i=1, j=2. Swap s[0] and s[2] to get s="bac", then reverse the suffix starting at 1. Now, s="bca".
Operation 3: i=2, j=2. Swap s[1] and s[2] to get s="bac", then reverse the suffix starting at 2. Now, s="bac".
Operation 4: i=1, j=1. Swap s[0] and s[1] to get s="abc", then reverse the suffix starting at 1. Now, s="acb".
Operation 5: i=2, j=2. Swap s[1] and s[2] to get s="abc", then reverse the suffix starting at 2. Now, s="abc".
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "aabaa"
<strong>Output:</strong> 2
<strong>Explanation:</strong> The simulation goes as follows:
Operation 1: i=3, j=4. Swap s[2] and s[4] to get s="aaaab", then reverse the substring starting at 3. Now, s="aaaba".
Operation 2: i=4, j=4. Swap s[3] and s[4] to get s="aaaab", then reverse the substring starting at 4. Now, s="aaaab".
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 3000</code></li>
	<li><code>s</code>​​​​​​ consists only of lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Combinatorics`**

- Time complexity: <em>O(26n -> n)</em>
- Space complexity: <em>O(26+n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
const makeStringSorted = function (s) {
  const MODULO = BigInt(10 ** 9 + 7);
  const BASE_CODE = 'a'.charCodeAt(0);
  const n = s.length;
  const fact = Array.from({ length: n + 1 }, () => 1n);
  const inv = Array.from({ length: n + 1 }, () => 1n);
  const invFact = Array.from({ length: n + 1 }, () => 1n);
  const counts = Array.from({ length: 26 }, () => 0n);
  let result = 0n;

  for (let count = 1; count <= n; count++) {
    const bigCount = BigInt(count);

    if (count > 1) {
      const multiple = MODULO / bigCount;
      const remainder = MODULO % bigCount;

      inv[count] = MODULO - ((multiple * inv[Number(remainder)]) % MODULO);
    }

    fact[count] = (fact[count - 1] * bigCount) % MODULO;
    invFact[count] = (invFact[count - 1] * inv[count]) % MODULO;
  }

  const getSmallerCharCount = targetCode => {
    let count = 0n;

    for (let code = 0; code < targetCode; code++) {
      count += counts[code];
    }

    return count;
  };

  for (let index = n - 1; index >= 0; index--) {
    const currentCode = s[index].charCodeAt(0) - BASE_CODE;

    counts[currentCode] += 1n;

    const charCount = getSmallerCharCount(currentCode);
    let totalCount = (charCount * fact[n - 1 - index]) % MODULO;

    for (let code = 0; code < 26; code++) {
      totalCount = (totalCount * invFact[counts[code]]) % MODULO;
    }

    result = (result + totalCount) % MODULO;
  }

  return Number(result);
};
```
