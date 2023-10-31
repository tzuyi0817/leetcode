# [1759. Count Number of Homogenous Substrings](https://leetcode.com/problems/count-number-of-homogenous-substrings)

## Description

<div class="xFUwe" data-track-load="description_content"><p>Given a string <code>s</code>, return <em>the number of <strong>homogenous</strong> substrings of </em><code>s</code><em>.</em> Since the answer may be too large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>A string is <strong>homogenous</strong> if all the characters of the string are the same.</p>

<p>A <strong>substring</strong> is a contiguous sequence of characters within a string.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "abbcccaa"
<strong>Output:</strong> 13
<strong>Explanation:</strong> The homogenous substrings are listed as below:
"a"   appears 3 times.
"aa"  appears 1 time.
"b"   appears 2 times.
"bb"  appears 1 time.
"c"   appears 3 times.
"cc"  appears 2 times.
"ccc" appears 1 time.
3 + 1 + 2 + 1 + 3 + 2 + 1 = 13.</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "xy"
<strong>Output:</strong> 2
<strong>Explanation:</strong> The homogenous substrings are "x" and "y".</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = "zzzzz"
<strong>Output:</strong> 15
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code> consists of lowercase letters.</li>
</ul></div>

<p>&nbsp;</p>

## Solutions

**Solution: `Math`**
- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
var countHomogenous = function(s) {
    const MODULO = 10 ** 9 + 7;
    let result = count = 0;

    for (let index = 0; index <= s.length; index++) {
        if (!index || s[index] === s[index - 1]) {
            count += 1;
            continue;
        }
        result += (count + 1) * count / 2;
        result %= MODULO;
        count = 1;
    }
    return result;
};
```
