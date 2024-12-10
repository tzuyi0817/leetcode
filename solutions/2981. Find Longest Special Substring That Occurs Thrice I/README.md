# [2981. Find Longest Special Substring That Occurs Thrice I](https://leetcode.com/problems/find-longest-special-substring-that-occurs-thrice-i)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a string <code>s</code> that consists of lowercase English letters.</p>

<p>A string is called <strong>special</strong> if it is made up of only a single character. For example, the string <code>"abc"</code> is not special, whereas the strings <code>"ddd"</code>, <code>"zz"</code>, and <code>"f"</code> are special.</p>

<p>Return <em>the length of the <strong>longest special substring</strong> of </em><code>s</code> <em>which occurs <strong>at least thrice</strong></em>, <em>or </em><code>-1</code><em> if no special substring occurs at least thrice</em>.</p>

<p>A <strong>substring</strong> is a contiguous <strong>non-empty</strong> sequence of characters within a string.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "aaaa"
<strong>Output:</strong> 2
<strong>Explanation:</strong> The longest special substring which occurs thrice is "aa": substrings "<u><strong>aa</strong></u>aa", "a<u><strong>aa</strong></u>a", and "aa<u><strong>aa</strong></u>".
It can be shown that the maximum length achievable is 2.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "abcdef"
<strong>Output:</strong> -1
<strong>Explanation:</strong> There exists no special substring which occurs at least thrice. Hence return -1.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = "abcaba"
<strong>Output:</strong> 1
<strong>Explanation:</strong> The longest special substring which occurs thrice is "a": substrings "<u><strong>a</strong></u>bcaba", "abc<u><strong>a</strong></u>ba", and "abcab<u><strong>a</strong></u>".
It can be shown that the maximum length achievable is 1.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>3 &lt;= s.length &lt;= 50</code></li>
	<li><code>s</code> consists of only lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Counting`**

- Time complexity: <em>O(26n)</em>
- Space complexity: <em>O(26n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
const maximumLength = function (s) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const n = s.length;
  const counts = Array.from({ length: 26 }, () => Array.from({ length: n + 1 }, () => 0));
  let length = 0;
  let result = -1;

  for (let index = 0; index < n; index++) {
    const letter = s[index];
    const code = letter.charCodeAt(0) - BASE_CODE;

    length = letter === s[index - 1] ? length + 1 : 1;
    counts[code][length] += 1;
  }

  const getLongestLength = code => {
    const count = counts[code];
    let times = 0;

    for (let length = n; length > 0; length--) {
      times += count[length];

      if (times >= 3) return length;
    }
    return -1;
  };

  for (let code = 0; code < 26; code++) {
    result = Math.max(getLongestLength(code), result);
  }
  return result;
};
```
