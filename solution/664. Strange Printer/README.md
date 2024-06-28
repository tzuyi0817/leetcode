# [664. Strange Printer](https://leetcode.com/problems/strange-printer)

## Description

<div class="elfjS" data-track-load="description_content"><p>There is a strange printer with the following two special properties:</p>

<ul>
	<li>The printer can only print a sequence of <strong>the same character</strong> each time.</li>
	<li>At each turn, the printer can print new characters starting from and ending at any place and will cover the original existing characters.</li>
</ul>

<p>Given a string <code>s</code>, return <em>the minimum number of turns the printer needed to print it</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "aaabbb"
<strong>Output:</strong> 2
<strong>Explanation:</strong> Print "aaa" first and then print "bbb".
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "aba"
<strong>Output:</strong> 2
<strong>Explanation:</strong> Print "aaa" first and then print "b" from the second place of the string, which will cover the existing character 'a'.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 100</code></li>
	<li><code>s</code> consists of lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**
- Time complexity: <em>O(n<sup>3</sup>)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
var strangePrinter = function(s) {
    const n = s.length;
    const dp = Array(n).fill('').map(_ => Array(n).fill(0));

    const turnPointer = (left, right) => {
        if (left > right) return 0;
        if (dp[left][right]) return dp[left][right];
    
        let result = turnPointer(left + 1, right) + 1;

        for (let index = left + 1; index <= right; index++) {
            if (s[index] !== s[left]) continue;
            const turnTimes = turnPointer(left + 1, index - 1) + turnPointer(index, right);

            result = Math.min(turnTimes, result);
        }
        return dp[left][right] = result;
    };

    return turnPointer(0, n - 1);
};
```
