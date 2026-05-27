# [3121. Count the Number of Special Characters II](https://leetcode.com/problems/count-the-number-of-special-characters-ii)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given a string <code>word</code>. A letter&nbsp;<code>c</code> is called <strong>special</strong> if it appears <strong>both</strong> in lowercase and uppercase in <code>word</code>, and <strong>every</strong> lowercase occurrence of <code>c</code> appears before the <strong>first</strong> uppercase occurrence of <code>c</code>.</p>

<p>Return the number of<em> </em><strong>special</strong> letters<em> </em>in<em> </em><code>word</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">word = "aaAbcBC"</span></p>

<p><strong>Output:</strong> <span class="example-io">3</span></p>

<p><strong>Explanation:</strong></p>

<p>The special characters are <code>'a'</code>, <code>'b'</code>, and <code>'c'</code>.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">word = "abc"</span></p>

<p><strong>Output:</strong> <span class="example-io">0</span></p>

<p><strong>Explanation:</strong></p>

<p>There are no special characters in <code>word</code>.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">word = "AbBCab"</span></p>

<p><strong>Output:</strong> <span class="example-io">0</span></p>

<p><strong>Explanation:</strong></p>

<p>There are no special characters in <code>word</code>.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= word.length &lt;= 2 * 10<sup>5</sup></code></li>
	<li><code>word</code> consists of only lowercase and uppercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Table`**

- Time complexity: <em>O(26+n)</em>
- Space complexity: <em>O(26 -> 1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} word
 * @return {number}
 */
const numberOfSpecialChars = function (word) {
  const n = word.length;
  const LOWER_CODE_A = 'a'.charCodeAt(0);
  const UPPER_CODE_A = 'A'.charCodeAt(0);
  const uppercaseFirst = Array.from({ length: 26 }, () => -1);
  const lowercaseLast = Array.from({ length: 26 }, () => -1);
  let result = 0;

  for (let index = 0; index < n; index++) {
    const char = word[index];

    if (/[a-z]/.test(char)) {
      const code = char.charCodeAt(0) - LOWER_CODE_A;

      lowercaseLast[code] = index;
    } else {
      const code = char.charCodeAt(0) - UPPER_CODE_A;

      if (uppercaseFirst[code] === -1) {
        uppercaseFirst[code] = index;
      }
    }
  }

  for (let code = 0; code < 26; code++) {
    if (lowercaseLast[code] === -1) continue;

    if (lowercaseLast[code] < uppercaseFirst[code]) {
      result += 1;
    }
  }

  return result;
};
```
