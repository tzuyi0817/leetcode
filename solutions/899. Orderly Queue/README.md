# [899. Orderly Queue](https://leetcode.com/problems/orderly-queue)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a string <code>s</code> and an integer <code>k</code>. You can choose one of the first <code>k</code> letters of <code>s</code> and append it at the end of the string.</p>

<p>Return <em>the lexicographically smallest string you could have after applying the mentioned step any number of moves</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "cba", k = 1
<strong>Output:</strong> "acb"
<strong>Explanation:</strong> 
In the first move, we move the 1<sup>st</sup> character 'c' to the end, obtaining the string "bac".
In the second move, we move the 1<sup>st</sup> character 'b' to the end, obtaining the final result "acb".
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "baaca", k = 3
<strong>Output:</strong> "aaabc"
<strong>Explanation:</strong> 
In the first move, we move the 1<sup>st</sup> character 'b' to the end, obtaining the string "aacab".
In the second move, we move the 3<sup>rd</sup> character 'c' to the end, obtaining the final result "aaabc".
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= k &lt;= s.length &lt;= 1000</code></li>
	<li><code>s</code> consist of lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Simulation`**
- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var orderlyQueue = function(s, k) {
    if (k > 1) {
        return s.split('').sort((a, b) => a.localeCompare(b)).join('');
    }

    let result = s;
    let current = s;

    for (const letter of s) {
        current = `${current.slice(1)}${letter}`;

        if (current >= result) continue;
        result = current;
    }
    return result;
};
```
