# [1684. Count the Number of Consistent Strings](https://leetcode.com/problems/count-the-number-of-consistent-strings)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a string <code>allowed</code> consisting of <strong>distinct</strong> characters and an array of strings <code>words</code>. A string is <strong>consistent </strong>if all characters in the string appear in the string <code>allowed</code>.</p>

<p>Return<em> the number of <strong>consistent</strong> strings in the array </em><code>words</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> allowed = "ab", words = ["ad","bd","aaab","baa","badab"]
<strong>Output:</strong> 2
<strong>Explanation:</strong> Strings "aaab" and "baa" are consistent since they only contain characters 'a' and 'b'.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> allowed = "abc", words = ["a","b","c","ab","ac","bc","abc"]
<strong>Output:</strong> 7
<strong>Explanation:</strong> All strings are consistent.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> allowed = "cad", words = ["cc","acd","b","ba","bac","bad","ac","d"]
<strong>Output:</strong> 4
<strong>Explanation:</strong> Strings "cc", "acd", "ac", and "d" are consistent.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= words.length &lt;= 10<sup>4</sup></code></li>
	<li><code>1 &lt;= allowed.length &lt;=<sup> </sup>26</code></li>
	<li><code>1 &lt;= words[i].length &lt;= 10</code></li>
	<li>The characters in <code>allowed</code> are <strong>distinct</strong>.</li>
	<li><code>words[i]</code> and <code>allowed</code> contain only lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Bit Manipulation`**
- Time complexity: <em>O(10n)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} allowed
 * @param {string[]} words
 * @return {number}
 */
var countConsistentStrings = function(allowed, words) {
    const BASE_CODE = 'a'.charCodeAt(0);
    const MAX_ALLOWED = 26;
    let mask = 1 << MAX_ALLOWED;

    for (const letter of allowed) {
        const code = letter.charCodeAt(0) - BASE_CODE;

        mask ^= 1 << code;
    }

    return words.reduce((result, word) => {
        let current = mask;

        for (const letter of word) {
            const code = letter.charCodeAt(0) - BASE_CODE;

            current |= 1 << code;
        }
        return result + (current === mask ? 1 : 0);
    }, 0);
};
```
