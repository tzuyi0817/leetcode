# [214. Shortest Palindrome](https://leetcode.com/problems/shortest-palindrome)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a string <code>s</code>. You can convert <code>s</code> to a <span data-keyword="palindrome-string" class=" cursor-pointer relative text-dark-blue-s text-sm"><div class="popover-wrapper inline-block" data-headlessui-state=""><div><div aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:rq2:"><div>palindrome</div></div><div style="position: fixed; z-index: 40; inset: 0px auto auto 0px; transform: translate(378px, 183px);"></div></div></div></span> by adding characters in front of it.</p>

<p>Return <em>the shortest palindrome you can find by performing this transformation</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<pre><strong>Input:</strong> s = "aacecaaa"
<strong>Output:</strong> "aaacecaaa"
</pre><p><strong class="example">Example 2:</strong></p>
<pre><strong>Input:</strong> s = "abcd"
<strong>Output:</strong> "dcbabcd"
</pre>
<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>0 &lt;= s.length &lt;= 5 * 10<sup>4</sup></code></li>
	<li><code>s</code> consists of lowercase English letters only.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `String Matching`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {string}
 */
const shortestPalindrome = function (s) {
  const n = s.length;
  const reverseS = s.split('').toReversed().join('');

  for (let index = 0; index < n; index++) {
    const sliceReverseS = reverseS.slice(index);
    const sliceS = s.slice(0, n - index);

    if (sliceReverseS !== sliceS) continue;
    return `${reverseS.slice(0, index)}${s}`;
  }
  return s;
};
```
