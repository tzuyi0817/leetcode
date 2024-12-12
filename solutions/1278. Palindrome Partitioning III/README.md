# [1278. Palindrome Partitioning III](https://leetcode.com/problems/palindrome-partitioning-iii)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a string <code>s</code> containing lowercase letters and an integer <code>k</code>. You need to :</p>

<ul>
	<li>First, change some characters of <code>s</code> to other lowercase English letters.</li>
	<li>Then divide <code>s</code> into <code>k</code> non-empty disjoint substrings such that each substring is a palindrome.</li>
</ul>

<p>Return <em>the minimal number of characters that you need to change to divide the string</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "abc", k = 2
<strong>Output:</strong> 1
<strong>Explanation:</strong>&nbsp;You can split the string into "ab" and "c", and change 1 character in "ab" to make it palindrome.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "aabbc", k = 3
<strong>Output:</strong> 0
<strong>Explanation:</strong>&nbsp;You can split the string into "aa", "bb" and "c", all of them are palindrome.</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = "leetcode", k = 8
<strong>Output:</strong> 0
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= k &lt;= s.length &lt;= 100</code>.</li>
	<li><code>s</code> only contains lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n<sup>2</sup>\*k)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const palindromePartition = function (s, k) {
  const n = s.length;
  const changes = Array.from({ length: n }, () => Array.from({ length: n }, () => 0));

  for (let length = 2; length <= n; length++) {
    for (let start = 0; start + length - 1 < n; start++) {
      const end = start + length - 1;
      const isSame = s[start] === s[end];

      changes[start][end] = changes[start + 1][end - 1] + (isSame ? 0 : 1);
    }
  }
  const memo = new Map();

  const partition = (length, divide) => {
    if (divide === 1) return changes[0][length - 1];
    const key = `${length},${divide}`;

    if (memo.has(key)) return memo.get(key);
    let result = length;

    for (let index = divide - 1; index < length; index++) {
      const change = changes[index][length - 1];

      result = Math.min(partition(index, divide - 1) + change, result);
    }
    memo.set(key, result);
    return result;
  };

  return partition(n, k);
};
```
