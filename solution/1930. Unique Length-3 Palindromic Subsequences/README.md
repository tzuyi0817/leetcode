# [1930. Unique Length-3 Palindromic Subsequences](https://leetcode.com/problems/unique-length-3-palindromic-subsequences)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a string <code>s</code>, return <em>the number of <strong>unique palindromes of length three</strong> that are a <strong>subsequence</strong> of </em><code>s</code>.</p>

<p>Note that even if there are multiple ways to obtain the same subsequence, it is still only counted <strong>once</strong>.</p>

<p>A <strong>palindrome</strong> is a string that reads the same forwards and backwards.</p>

<p>A <strong>subsequence</strong> of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.</p>

<ul>
	<li>For example, <code>"ace"</code> is a subsequence of <code>"<u>a</u>b<u>c</u>d<u>e</u>"</code>.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "aabca"
<strong>Output:</strong> 3
<strong>Explanation:</strong> The 3 palindromic subsequences of length 3 are:
- "aba" (subsequence of "<u>a</u>a<u>b</u>c<u>a</u>")
- "aaa" (subsequence of "<u>aa</u>bc<u>a</u>")
- "aca" (subsequence of "<u>a</u>ab<u>ca</u>")
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "adc"
<strong>Output:</strong> 0
<strong>Explanation:</strong> There are no palindromic subsequences of length 3 in "adc".
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = "bbcbaba"
<strong>Output:</strong> 4
<strong>Explanation:</strong> The 4 palindromic subsequences of length 3 are:
- "bbb" (subsequence of "<u>bb</u>c<u>b</u>aba")
- "bcb" (subsequence of "<u>b</u>b<u>cb</u>aba")
- "bab" (subsequence of "<u>b</u>bcb<u>ab</u>a")
- "aba" (subsequence of "bbcb<u>aba</u>")
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>3 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code> consists of only lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Table`**
- Time complexity: <em>O(n*26)</em>
- Space complexity: <em>O(26)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
var countPalindromicSubsequence = function(s) {
    const BASE_CHAR_CODE = 'a'.charCodeAt(0);
    let result = 0;

    for (let code = 0; code < 26; code++) {
        const char = String.fromCharCode(BASE_CHAR_CODE + code);
        const start = s.indexOf(char);

        if (start < 0) continue;
        const end = s.lastIndexOf(char);

        if (start >= end) continue;
        const isVisited = Array(26).fill(false);
        let count = 0;

        for (let index = start + 1; index < end; index++) {
            const charCode = s.charCodeAt(index) - BASE_CHAR_CODE;

            if (isVisited[charCode]) continue;
            count += 1;
            isVisited[charCode] = true;
        }
        result += count;
    }
    return result;
};
```
