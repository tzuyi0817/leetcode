# [1002. Find Common Characters](https://leetcode.com/problems/find-common-characters)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a string array <code>words</code>, return <em>an array of all characters that show up in all strings within the </em><code>words</code><em> (including duplicates)</em>. You may return the answer in <strong>any order</strong>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<pre><strong>Input:</strong> words = ["bella","label","roller"]
<strong>Output:</strong> ["e","l","l"]
</pre><p><strong class="example">Example 2:</strong></p>
<pre><strong>Input:</strong> words = ["cool","lock","cook"]
<strong>Output:</strong> ["c","o"]
</pre>
<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= words.length &lt;= 100</code></li>
	<li><code>1 &lt;= words[i].length &lt;= 100</code></li>
	<li><code>words[i]</code> consists of lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Map`**

- Time complexity: <em>O(n\*word.length)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string[]} words
 * @return {string[]}
 */
const commonChars = function (words) {
  const BASE_CHAR_CODE = 'a'.charCodeAt(0);
  const result = [];
  const counts = Array(26).fill(Number.MAX_SAFE_INTEGER);

  for (const word of words) {
    const currentCounts = Array(26).fill(0);

    for (const char of word) {
      const index = char.charCodeAt(0) - BASE_CHAR_CODE;

      currentCounts[index] += 1;
    }
    for (let index = 0; index < 26; index++) {
      counts[index] = Math.min(currentCounts[index], counts[index]);
    }
  }
  for (let index = 0; index < 26; index++) {
    const char = String.fromCharCode(BASE_CHAR_CODE + index);
    const count = counts[index];

    result.push(...char.repeat(count));
  }
  return result;
};
```
