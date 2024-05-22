# [131. Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a string <code>s</code>, partition <code>s</code> such that every <span data-keyword="substring-nonempty" class=" cursor-pointer relative text-dark-blue-s text-sm"><div class="popover-wrapper inline-block" data-headlessui-state=""><div><div aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:rv:"><div>substring</div></div><div style="position: fixed; z-index: 40; inset: 0px auto auto 0px; transform: translate(348px, 183px);"></div></div></div></span> of the partition is a <span data-keyword="palindrome-string" class=" cursor-pointer relative text-dark-blue-s text-sm"><div class="popover-wrapper inline-block" data-headlessui-state=""><div><div aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:r11:"><div><strong>palindrome</strong></div></div><div style="position: fixed; z-index: 40; inset: 0px auto auto 0px; transform: translate(148px, 204px);"></div></div></div></span>. Return <em>all possible palindrome partitioning of </em><code>s</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<pre><strong>Input:</strong> s = "aab"
<strong>Output:</strong> [["a","a","b"],["aa","b"]]
</pre><p><strong class="example">Example 2:</strong></p>
<pre><strong>Input:</strong> s = "a"
<strong>Output:</strong> [["a"]]
</pre>
<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 16</code></li>
	<li><code>s</code> contains only lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Backtracking`**
- Time complexity: <em>O(2<sup>n</sup>)</em>
- Space complexity: <em>O(2<sup>n</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
    const n = s.length;
    const result = [];
    const isPalindrome = (str) => {
        let left = 0;
        let right = str.length - 1;

        while (left < right) {
            if (str[left] !== str[right]) return false;
            left += 1;
            right -= 1;
        }
        return true;
    };
    const backtrackingSubstr = (start, substrs) => {
        if (start === n) {
            result.push(substrs);
            return;
        }
        let current = '';

        for (let index = start; index < n; index++) {
            current += s[index];

            if (!isPalindrome(current)) continue;
            substrs.push(current);
            backtrackingSubstr(index + 1, [...substrs]);
            substrs.pop();
        }
    };

    backtrackingSubstr(0, []);
    return result;
};
```
