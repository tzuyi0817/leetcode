# [2840. Check if Strings Can be Made Equal With Operations II](https://leetcode.com/problems/check-if-strings-can-be-made-equal-with-operations-ii)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given two strings <code>s1</code> and <code>s2</code>, both of length <code>n</code>, consisting of <strong>lowercase</strong> English letters.</p>

<p>You can apply the following operation on <strong>any</strong> of the two strings <strong>any</strong> number of times:</p>

<ul>
	<li>Choose any two indices <code>i</code> and <code>j</code> such that <code>i &lt; j</code> and the difference <code>j - i</code> is <strong>even</strong>, then <strong>swap</strong> the two characters at those indices in the string.</li>
</ul>

<p>Return <code>true</code><em> if you can make the strings </em><code>s1</code><em> and </em><code>s2</code><em> equal, and&nbsp;</em><code>false</code><em> otherwise</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s1 = "abcdba", s2 = "cabdab"
<strong>Output:</strong> true
<strong>Explanation:</strong> We can apply the following operations on s1:
- Choose the indices i = 0, j = 2. The resulting string is s1 = "cbadba".
- Choose the indices i = 2, j = 4. The resulting string is s1 = "cbbdaa".
- Choose the indices i = 1, j = 5. The resulting string is s1 = "cabdab" = s2.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s1 = "abe", s2 = "bea"
<strong>Output:</strong> false
<strong>Explanation:</strong> It is not possible to make the two strings equal.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == s1.length == s2.length</code></li>
	<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>s1</code> and <code>s2</code> consist only of lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Table`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(26 -> 1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
const checkStrings = function (s1, s2) {
  const n = s1.length;
  const BASE_CODE = 'a'.charCodeAt(0);
  const oddChars = Array.from({ length: 26 }, () => 0);
  const evenChars = Array.from({ length: 26 }, () => 0);

  for (let index = 0; index < n; index++) {
    const code1 = s1[index].charCodeAt(0) - BASE_CODE;
    const code2 = s2[index].charCodeAt(0) - BASE_CODE;

    if (index % 2) {
      oddChars[code1] += 1;
      oddChars[code2] -= 1;
    } else {
      evenChars[code1] += 1;
      evenChars[code2] -= 1;
    }
  }

  for (let code = 0; code < 26; code++) {
    if (oddChars[code] !== 0 || evenChars[code] !== 0) {
      return false;
    }
  }

  return true;
};
```
