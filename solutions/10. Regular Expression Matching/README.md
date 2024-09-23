# [10. Regular Expression Matching](https://leetcode.com/problems/regular-expression-matching)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an input string <code>s</code>&nbsp;and a pattern <code>p</code>, implement regular expression matching with support for <code>'.'</code> and <code>'*'</code> where:</p>

<ul>
	<li><code>'.'</code> Matches any single character.​​​​</li>
	<li><code>'*'</code> Matches zero or more of the preceding element.</li>
</ul>

<p>The matching should cover the <strong>entire</strong> input string (not partial).</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "aa", p = "a"
<strong>Output:</strong> false
<strong>Explanation:</strong> "a" does not match the entire string "aa".
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "aa", p = "a*"
<strong>Output:</strong> true
<strong>Explanation:</strong> '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = "ab", p = ".*"
<strong>Output:</strong> true
<strong>Explanation:</strong> ".*" means "zero or more (*) of any character (.)".
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length&nbsp;&lt;= 20</code></li>
	<li><code>1 &lt;= p.length&nbsp;&lt;= 20</code></li>
	<li><code>s</code> contains only lowercase English letters.</li>
	<li><code>p</code> contains only lowercase English letters, <code>'.'</code>, and&nbsp;<code>'*'</code>.</li>
	<li>It is guaranteed for each appearance of the character <code>'*'</code>, there will be a previous valid character to match.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Recursion`**
- Time complexity: <em>O(mn)</em>
- Space complexity: <em>O(mn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    const hashMap = new Map();
    const checkRegex = (index, j) => {
        const cacheKey = `${index},${j}`;

        if (hashMap.has(cacheKey)) return hashMap.get(cacheKey);
        if (j === p.length) return index === s.length;

        const isFirstMatch = index < s.length && (s[index] === p[j] || p[j] === '.');
        const isCheckPreceding = j + 1 < p.length && p[j + 1] === '*';
        const result = isCheckPreceding 
            ? checkRegex(index, j + 2) || (isFirstMatch && checkRegex(index + 1, j))
            : isFirstMatch && checkRegex(index + 1, j + 1);

        hashMap.set(cacheKey, result);
        return result;
    };

    return checkRegex(0, 0);
};
```
