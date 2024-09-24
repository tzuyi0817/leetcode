# [2062. Count Vowel Substrings of a String](https://leetcode.com/problems/count-vowel-substrings-of-a-string)

## Description

<div class="elfjS" data-track-load="description_content"><p>A <strong>substring</strong> is a contiguous (non-empty) sequence of characters within a string.</p>

<p>A <strong>vowel substring</strong> is a substring that <strong>only</strong> consists of vowels (<code>'a'</code>, <code>'e'</code>, <code>'i'</code>, <code>'o'</code>, and <code>'u'</code>) and has <strong>all five</strong> vowels present in it.</p>

<p>Given a string <code>word</code>, return <em>the number of <strong>vowel substrings</strong> in</em> <code>word</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> word = "aeiouu"
<strong>Output:</strong> 2
<strong>Explanation:</strong> The vowel substrings of word are as follows (underlined):
- "<strong><u>aeiou</u></strong>u"
- "<strong><u>aeiouu</u></strong>"
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> word = "unicornarihan"
<strong>Output:</strong> 0
<strong>Explanation:</strong> Not all 5 vowels are present, so there are no vowel substrings.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> word = "cuaieuouac"
<strong>Output:</strong> 7
<strong>Explanation:</strong> The vowel substrings of word are as follows (underlined):
- "c<strong><u>uaieuo</u></strong>uac"
- "c<strong><u>uaieuou</u></strong>ac"
- "c<strong><u>uaieuoua</u></strong>c"
- "cu<strong><u>aieuo</u></strong>uac"
- "cu<strong><u>aieuou</u></strong>ac"
- "cu<strong><u>aieuoua</u></strong>c"
- "cua<strong><u>ieuoua</u></strong>c"
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= word.length &lt;= 100</code></li>
	<li><code>word</code> consists of lowercase English letters only.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Table`**

- Time complexity: <em>O(5n)</em>
- Space complexity: <em>O(5)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} word
 * @return {number}
 */
const countVowelSubstrings = function (word) {
  const size = word.length;
  const vowelMap = new Map([
    ['a', -1],
    ['e', -1],
    ['i', -1],
    ['o', -1],
    ['u', -1],
  ]);
  let result = (left = 0);

  function startMinSubstrVowel() {
    let start = size;

    for (const index of vowelMap.values()) {
      if (index === -1) return -1;
      start = Math.min(index, start);
    }
    return start;
  }
  for (let index = 0; index < size; index++) {
    const char = word[index];

    if (!vowelMap.has(char)) {
      left = index + 1;
      continue;
    }
    vowelMap.set(char, index);
    const start = startMinSubstrVowel();
    const count = start - left + 1;

    if (count < 0) continue;
    result += count;
  }
  return result;
};
```
