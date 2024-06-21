# [564. Find the Closest Palindrome](https://leetcode.com/problems/find-the-closest-palindrome)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a string <code>n</code> representing an integer, return <em>the closest integer (not including itself), which is a palindrome</em>. If there is a tie, return <em><strong>the smaller one</strong></em>.</p>

<p>The closest is defined as the absolute difference minimized between two integers.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> n = "123"
<strong>Output:</strong> "121"
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = "1"
<strong>Output:</strong> "0"
<strong>Explanation:</strong> 0 and 2 are the closest palindromes but we return the smallest which is 0.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n.length &lt;= 18</code></li>
	<li><code>n</code> consists of only digits.</li>
	<li><code>n</code> does not have leading zeros.</li>
	<li><code>n</code> is representing an integer in the range <code>[1, 10<sup>18</sup> - 1]</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Math`**
- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} n
 * @return {string}
 */
var nearestPalindromic = function(n) {
    const size = n.length;
    const maxInteger = 10 ** size + 1;
    const minInteger = 10 ** (size - 1) - 1;
    const palindromicSet = new Set([`${minInteger}`]);
    const prefix = n.slice(0, Math.floor((size + 1) / 2));
    const isOdd = size % 2;

    const getPalindromic = (closestPrefix) => {
        const str = `${closestPrefix}`;
        const n = str.length;
        const start = isOdd ? n - 2 : n - 1;
        let result = str;

        for (let index = start; index >= 0; index--) {
            result += str[index];
        }
        return result;
    };

    for (let diff = -1; diff <= 1; diff++) {
        const closestPrefix = +prefix + diff;
        const palindromic = getPalindromic(closestPrefix);

        palindromicSet.add(palindromic);
    }
    let result = '';
    let minDiff = Number.MAX_SAFE_INTEGER;

    palindromicSet.add(`${maxInteger}`); // ensure smaller one
    palindromicSet.delete(`${n}`);
    
    for (const palindromic of palindromicSet) {
        const diff = Math.abs(n - palindromic);

        if (diff >= minDiff) continue;
        result = palindromic;
        minDiff = diff;
    }
    return result;
};
```
