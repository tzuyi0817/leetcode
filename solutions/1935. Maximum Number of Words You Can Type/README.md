# [1935. Maximum Number of Words You Can Type](https://leetcode.com/problems/maximum-number-of-words-you-can-type)

## Description

<div class="elfjS" data-track-load="description_content"><p>There is a malfunctioning keyboard where some letter keys do not work. All other keys on the keyboard work properly.</p>

<p>Given a string <code>text</code> of words separated by a single space (no leading or trailing spaces) and a string <code>brokenLetters</code> of all <strong>distinct</strong> letter keys that are broken, return <em>the <strong>number of words</strong> in</em> <code>text</code> <em>you can fully type using this keyboard</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> text = "hello world", brokenLetters = "ad"
<strong>Output:</strong> 1
<strong>Explanation:</strong> We cannot type "world" because the 'd' key is broken.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> text = "leet code", brokenLetters = "lt"
<strong>Output:</strong> 1
<strong>Explanation:</strong> We cannot type "leet" because the 'l' and 't' keys are broken.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> text = "leet code", brokenLetters = "e"
<strong>Output:</strong> 0
<strong>Explanation:</strong> We cannot type either word because the 'e' key is broken.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= text.length &lt;= 10<sup>4</sup></code></li>
	<li><code>0 &lt;= brokenLetters.length &lt;= 26</code></li>
	<li><code>text</code> consists of words separated by a single space without any leading or trailing spaces.</li>
	<li>Each word only consists of lowercase English letters.</li>
	<li><code>brokenLetters</code> consists of <strong>distinct</strong> lowercase English letters.</li>
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
 * @param {string} text
 * @param {string} brokenLetters
 * @return {number}
 */
const canBeTypedWords = function (text, brokenLetters) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const words = text.split(' ');
  const letters = Array.from({ length: 26 }, () => true);
  let result = 0;

  for (const char of brokenLetters) {
    const code = char.charCodeAt(0) - BASE_CODE;

    letters[code] = false;
  }

  const isValidWord = word => {
    for (const char of word) {
      const code = char.charCodeAt(0) - BASE_CODE;

      if (!letters[code]) return false;
    }

    return true;
  };

  for (const word of words) {
    if (isValidWord(word)) {
      result += 1;
    }
  }

  return result;
};
```
