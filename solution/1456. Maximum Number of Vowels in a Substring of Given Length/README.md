# [1456. Maximum Number of Vowels in a Substring of Given Length](https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length)

## Description

<div class="_1l1MA" data-track-load="description_content"><p>Given a string <code>s</code> and an integer <code>k</code>, return <em>the maximum number of vowel letters in any substring of </em><code>s</code><em> with length </em><code>k</code>.</p>

<p><strong>Vowel letters</strong> in English are <code>'a'</code>, <code>'e'</code>, <code>'i'</code>, <code>'o'</code>, and <code>'u'</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "abciiidef", k = 3
<strong>Output:</strong> 3
<strong>Explanation:</strong> The substring "iii" contains 3 vowel letters.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "aeiou", k = 2
<strong>Output:</strong> 2
<strong>Explanation:</strong> Any substring of length 2 contains 2 vowels.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = "leetcode", k = 3
<strong>Output:</strong> 2
<strong>Explanation:</strong> "lee", "eet" and "ode" contain 2 vowels.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code> consists of lowercase English letters.</li>
	<li><code>1 &lt;= k &lt;= s.length</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Sliding Window`**
- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function(s, k) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    let left = 0;
    let result = current = s.slice(0, k).split('').filter(char => vowels.has(char)).length;

    for (let index = k; index < s.length; index++) {
        vowels.has(s[index]) && (current += 1);
        vowels.has(s[left]) && (current -= 1);
        left += 1;   
        result = Math.max(current, result);
    }
    return result;
};
```
