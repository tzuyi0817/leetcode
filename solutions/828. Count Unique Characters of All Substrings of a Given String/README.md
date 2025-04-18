# [828. Count Unique Characters of All Substrings of a Given String](https://leetcode.com/problems/count-unique-characters-of-all-substrings-of-a-given-string)

## Description

<div class="elfjS" data-track-load="description_content"><p>Let's define a function <code>countUniqueChars(s)</code> that returns the number of unique characters in&nbsp;<code>s</code>.</p>

<ul>
	<li>For example, calling <code>countUniqueChars(s)</code> if <code>s = "LEETCODE"</code> then <code>"L"</code>, <code>"T"</code>, <code>"C"</code>, <code>"O"</code>, <code>"D"</code> are the unique characters since they appear only once in <code>s</code>, therefore <code>countUniqueChars(s) = 5</code>.</li>
</ul>

<p>Given a string <code>s</code>, return the sum of <code>countUniqueChars(t)</code> where <code>t</code> is a substring of <code>s</code>. The test cases are generated such that the answer fits in a 32-bit integer.</p>

<p>Notice that some substrings can be repeated so in this case you have to count the repeated ones too.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "ABC"
<strong>Output:</strong> 10
<strong>Explanation: </strong>All possible substrings are: "A","B","C","AB","BC" and "ABC".
Every substring is composed with only unique letters.
Sum of lengths of all substring is 1 + 1 + 1 + 2 + 2 + 3 = 10
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "ABA"
<strong>Output:</strong> 8
<strong>Explanation: </strong>The same as example 1, except <code>countUniqueChars</code>("ABA") = 1.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = "LEETCODE"
<strong>Output:</strong> 92
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code> consists of uppercase English letters only.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(26)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
const uniqueLetterString = function (s) {
  const BASE_CODE = 'A'.charCodeAt(0);
  const n = s.length;
  const lastCount = Array.from({length: 26}).fill(0);
  const lastSeen = Array.from({length: 26}).fill(-1);
  let dp = 0;
  let result = 0;

  for (let index = 0; index < n; index++) {
    const code = s[index].charCodeAt(0) - BASE_CODE;
    const count = index - lastSeen[code];

    dp += count - lastCount[code];
    lastCount[code] = count;
    lastSeen[code] = index;
    result += dp;
  }
  return result;
};
```
