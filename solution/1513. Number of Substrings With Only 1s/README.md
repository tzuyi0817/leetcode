# [1513. Number of Substrings With Only 1s](https://leetcode.com/problems/number-of-substrings-with-only-1s)

## Description

<div class="xFUwe" data-track-load="description_content"><p>Given a binary string <code>s</code>, return <em>the number of substrings with all characters</em> <code>1</code><em>'s</em>. Since the answer may be too large, return it modulo <code>10<sup>9</sup> + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "0110111"
<strong>Output:</strong> 9
<strong>Explanation:</strong> There are 9 substring in total with only 1's characters.
"1" -&gt; 5 times.
"11" -&gt; 3 times.
"111" -&gt; 1 time.</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "101"
<strong>Output:</strong> 2
<strong>Explanation:</strong> Substring "1" is shown 2 times in s.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = "111111"
<strong>Output:</strong> 21
<strong>Explanation:</strong> Each substring contains only 1's characters.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s[i]</code> is either <code>'0'</code> or <code>'1'</code>.</li>
</ul>
</div>

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
var numSub = function(s) {
   const MODULO = 10 ** 9 + 7;
   let result = current = subCount = 0;

   for (let index = 0; index <= s.length; index++) {
      const char = s[index];

      if (char === '1') {
         subCount += 1;
         current += subCount;
         continue;
      }
      result = (result + current) % MODULO;
      current = subCount = 0;
   }
   return result;
};
```
