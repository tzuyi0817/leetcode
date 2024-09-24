# [564. Find the Closest Palindrome](https://leetcode.com/problems/find-the-closest-palindrome)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a string <code>n</code> representing an integer, return <em>the closest integer (not including itself), which is a palindrome</em>. If there is a tie, return <em><strong>the smaller one</strong></em>.</p>

<p>The closest is defined as the absolute difference minimized between two integers.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> n = "123"
<strong>Output:</strong> "121"
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = "1"
<strong>Output:</strong> "0"
<strong>Explanation:</strong> 0 and 2 are the closest palindromes but we return the smallest which is 0.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n.length &lt;= 18</code></li>
	<li><code>n</code> consists of only digits.</li>
	<li><code>n</code> does not have leading zeros.</li>
	<li><code>n</code> is representing an integer in the range <code>[1, 10<sup>18</sup> - 1]</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Math`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} n
 * @return {string}
 */
const nearestPalindromic = function (n) {
  const { length } = n;
  const maxPalindrome = 10 ** length + 1;
  const minPalindrome = 10 ** (length - 1) - 1;
  const palindromes = [`${minPalindrome}`];
  const prefix = n.slice(0, Math.ceil(length / 2));
  const isOdd = length % 2;

  const createPalindrome = value => {
    value = `${value}`;
    const n = value.length;
    const start = isOdd ? n - 2 : n - 1;
    let result = value;

    for (let index = start; index >= 0; index--) {
      result += value[index];
    }
    return result;
  };

  for (let diff = -1; diff <= 1; diff++) {
    const value = +prefix + diff;
    const palindrome = createPalindrome(value);

    palindromes.push(palindrome);
  }
  palindromes.push(`${maxPalindrome}`);

  let result = maxPalindrome;
  let minDiff = Number.MAX_SAFE_INTEGER;

  for (const palindrome of palindromes) {
    if (palindrome === n) continue;
    const diff = Math.abs(palindrome - n);

    if (minDiff <= diff) continue;
    minDiff = diff;
    result = palindrome;
  }
  return result;
};
```
