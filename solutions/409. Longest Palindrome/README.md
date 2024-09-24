# [409. Longest Palindrome](https://leetcode.com/problems/longest-palindrome)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a string <code>s</code> which consists of lowercase or uppercase letters, return the length of the <strong>longest <span data-keyword="palindrome-string" class=" cursor-pointer relative text-dark-blue-s text-sm"><div class="popover-wrapper inline-block" data-headlessui-state=""><div><div aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:rv:"><div>palindrome</div></div><div style="position: fixed; z-index: 40; inset: 0px auto auto 0px; transform: translate(274px, 204px);"></div></div></div></span></strong>&nbsp;that can be built with those letters.</p>

<p>Letters are <strong>case sensitive</strong>, for example, <code>"Aa"</code> is not considered a palindrome.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "abccccdd"
<strong>Output:</strong> 7
<strong>Explanation:</strong> One longest palindrome that can be built is "dccaccd", whose length is 7.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "a"
<strong>Output:</strong> 1
<strong>Explanation:</strong> The longest palindrome that can be built is "a", whose length is 1.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 2000</code></li>
	<li><code>s</code> consists of lowercase <strong>and/or</strong> uppercase English&nbsp;letters only.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Map`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
const longestPalindrome = function (s) {
  const builtMap = new Map();
  let result = 0;

  for (const char of s) {
    const count = builtMap.get(char) ?? 0;

    builtMap.set(char, count + 1);
  }
  for (let count of builtMap.values()) {
    const isOdd = count % 2;

    if (isOdd) count -= 1;
    result += count;
  }
  return result < s.length ? result + 1 : result;
};
```
