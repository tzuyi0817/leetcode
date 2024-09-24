# [761. Special Binary String](https://leetcode.com/problems/special-binary-string)

## Description

<div class="elfjS" data-track-load="description_content"><p><strong>Special binary strings</strong> are binary strings with the following two properties:</p>

<ul>
	<li>The number of <code>0</code>'s is equal to the number of <code>1</code>'s.</li>
	<li>Every prefix of the binary string has at least as many <code>1</code>'s as <code>0</code>'s.</li>
</ul>

<p>You are given a <strong>special binary</strong> string <code>s</code>.</p>

<p>A move consists of choosing two consecutive, non-empty, special substrings of <code>s</code>, and swapping them. Two strings are consecutive if the last character of the first string is exactly one index before the first character of the second string.</p>

<p>Return <em>the lexicographically largest resulting string possible after applying the mentioned operations on the string</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "11011000"
<strong>Output:</strong> "11100100"
<strong>Explanation:</strong> The strings "10" [occuring at s[1]] and "1100" [at s[3]] are swapped.
This is the lexicographically largest string possible after some number of swaps.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "10"
<strong>Output:</strong> "10"
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 50</code></li>
	<li><code>s[i]</code> is either <code>'0'</code> or <code>'1'</code>.</li>
	<li><code>s</code> is a special binary string.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Recursion`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {string}
 */
const makeLargestSpecial = function (s) {
  const result = [];
  let left = 0;
  let current = 0;

  for (let index = 0; index < s.length; index++) {
    current += s[index] === '1' ? 1 : -1;

    if (current) continue;
    const subStr = s.slice(left + 1, index);

    result.push(`1${makeLargestSpecial(subStr)}0`);
    left = index + 1;
  }
  result.sort((a, b) => b.localeCompare(a));

  return result.join('');
};
```
