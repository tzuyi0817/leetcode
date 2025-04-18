# [1531. String Compression II](https://leetcode.com/problems/string-compression-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p><a href="http://en.wikipedia.org/wiki/Run-length_encoding">Run-length encoding</a> is a string compression method that works by&nbsp;replacing consecutive identical characters (repeated 2 or more times) with the concatenation of the character and the number marking the count of the characters (length of the run). For example, to compress the string&nbsp;<code>"aabccc"</code>&nbsp;we replace <font face="monospace"><code>"aa"</code></font>&nbsp;by&nbsp;<font face="monospace"><code>"a2"</code></font>&nbsp;and replace <font face="monospace"><code>"ccc"</code></font>&nbsp;by&nbsp;<font face="monospace"><code>"c3"</code></font>. Thus the compressed string becomes <font face="monospace"><code>"a2bc3"</code>.</font></p>

<p>Notice that in this problem, we are not adding&nbsp;<code>'1'</code>&nbsp;after single characters.</p>

<p>Given a&nbsp;string <code>s</code>&nbsp;and an integer <code>k</code>. You need to delete <strong>at most</strong>&nbsp;<code>k</code> characters from&nbsp;<code>s</code>&nbsp;such that the run-length encoded version of <code>s</code>&nbsp;has minimum length.</p>

<p>Find the <em>minimum length of the run-length encoded&nbsp;version of </em><code>s</code><em> after deleting at most </em><code>k</code><em> characters</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "aaabcccd", k = 2
<strong>Output:</strong> 4
<b>Explanation: </b>Compressing s without deleting anything will give us "a3bc3d" of length 6. Deleting any of the characters 'a' or 'c' would at most decrease the length of the compressed string to 5, for instance delete 2 'a' then we will have s = "abcccd" which compressed is abc3d. Therefore, the optimal way is to delete 'b' and 'd', then the compressed version of s will be "a3c3" of length 4.</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "aabbaa", k = 2
<strong>Output:</strong> 2
<b>Explanation: </b>If we delete both 'b' characters, the resulting compressed string would be "a4" of length 2.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = "aaaaaaaaaaa", k = 0
<strong>Output:</strong> 3
<strong>Explanation: </strong>Since k is zero, we cannot delete anything. The compressed string is "a11" of length 3.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 100</code></li>
	<li><code>0 &lt;= k &lt;= s.length</code></li>
	<li><code>s</code> contains only lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n<sup>2</sup>k)</em>
- Space complexity: <em>O(n<sup>2</sup>k)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const getLengthOfOptimalCompression = function (s, k) {
  const n = s.length;
  const memo = new Map();

  const getLength = count => 1 + (count > 1 ? `${count}`.length : 0);

  const getMinCompressLength = (index, remove, prevStr, count) => {
    if (index >= n) return count <= k - remove ? 0 : getLength(count);
    const key = `${index},${remove},${prevStr},${count}`;

    if (memo.has(key)) return memo.get(key);
    const str = s[index];
    const isConcatenation = str === prevStr;
    let result =
      !prevStr || isConcatenation
        ? getMinCompressLength(index + 1, remove, str, count + 1)
        : getLength(count) + getMinCompressLength(index + 1, remove, str, 1);

    if (remove < k) {
      const removeLength = getMinCompressLength(index + 1, remove + 1, prevStr, count);

      result = Math.min(removeLength, result);
    }

    memo.set(key, result);

    return result;
  };

  return getMinCompressLength(0, 0, '', 0);
};
```
