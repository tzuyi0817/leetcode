# [1781. Sum of Beauty of All Substrings](https://leetcode.com/problems/sum-of-beauty-of-all-substrings)

## Description

<div class="xFUwe" data-track-load="description_content"><p>The <strong>beauty</strong> of a string is the difference in frequencies between the most frequent and least frequent characters.</p>

<ul>
	<li>For example, the beauty of <code>"abaacc"</code> is <code>3 - 1 = 2</code>.</li>
</ul>

<p>Given a string <code>s</code>, return <em>the sum of <strong>beauty</strong> of all of its substrings.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "aabcb"
<strong>Output:</strong> 5
<strong>Explanation: </strong>The substrings with non-zero beauty are ["aab","aabc","aabcb","abcb","bcb"], each with beauty equal to 1.</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "aabcbaa"
<strong>Output:</strong> 17
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;=<sup> </sup>500</code></li>
	<li><code>s</code> consists of only lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `counting`**
- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
var beautySum = function(s) {
    const CODE_BASE = 'a'.charCodeAt(0);
    const size = s.length;
    const frequencies = Array(26).fill(0);
    let result = 0;

    for (let a = 0; a < size - 1; a++) {
        frequencies[s.charCodeAt(a) - CODE_BASE] += 1;

        for (let b = a + 1; b < size; b++) {
            let maxCount = 0;
            let minCount = Number.MAX_SAFE_INTEGER;

            frequencies[s.charCodeAt(b) - CODE_BASE] += 1;
            frequencies
                .filter(count => count !== 0)
                .forEach(count => {
                    maxCount = Math.max(count, maxCount);
                    minCount = Math.min(count, minCount);
                });
            result += maxCount - minCount;
        }
        frequencies.fill(0);
    }
    return result;
};
```
