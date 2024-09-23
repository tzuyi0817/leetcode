# [76. Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given two strings <code>s</code> and <code>t</code> of lengths <code>m</code> and <code>n</code> respectively, return <em>the <strong>minimum window</strong></em> <span data-keyword="substring-nonempty" class=" cursor-pointer relative text-dark-blue-s text-sm"><div class="popover-wrapper inline-block" data-headlessui-state=""><div><div aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:r14:"><div><strong><em>substring</em></strong></div></div><div style="position: fixed; z-index: 40; inset: 0px auto auto 0px; transform: translate(208px, 204px);"></div></div></div></span><em> of </em><code>s</code><em> such that every character in </em><code>t</code><em> (<strong>including duplicates</strong>) is included in the window</em>. If there is no such substring, return <em>the empty string </em><code>""</code>.</p>

<p>The testcases will be generated such that the answer is <strong>unique</strong>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "ADOBECODEBANC", t = "ABC"
<strong>Output:</strong> "BANC"
<strong>Explanation:</strong> The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "a", t = "a"
<strong>Output:</strong> "a"
<strong>Explanation:</strong> The entire string s is the minimum window.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = "a", t = "aa"
<strong>Output:</strong> ""
<strong>Explanation:</strong> Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == s.length</code></li>
	<li><code>n == t.length</code></li>
	<li><code>1 &lt;= m, n &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code> and <code>t</code> consist of uppercase and lowercase English letters.</li>
</ul>

<p>&nbsp;</p>
<p><strong>Follow up:</strong> Could you find an algorithm that runs in <code>O(m + n)</code> time?</p>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Sliding Window + Hash Map`**
- Time complexity: <em>O(m+n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    const targetMap = new Map();
    let minSize = Number.MAX_SAFE_INTEGER;
    let left = current = 0;
    let minLeft = -1;

    for (const str of t) {
        const count = targetMap.get(str) ?? 0;

        targetMap.set(str, count + 1);
    }
    for (let index = 0; index < s.length; index++) {
        if (targetMap.has(s[index])) {
            const count = targetMap.get(s[index]) - 1;

            targetMap.set(s[index], count);
            if (count > -1) current += 1;
        }
        while (current === t.length) {
            if (index - left + 1 < minSize) {
                minSize = index - left + 1;
                minLeft = left; 
            }
            if (targetMap.has(s[left])) {
                const count = targetMap.get(s[left]) + 1;

                targetMap.set(s[left], count);
                if (count > 0) current -= 1;
            }
            left += 1;
        }
    }
    return minLeft > -1 ? s.slice(minLeft, minLeft + minSize) : '';
};
```
