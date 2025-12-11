# [2785. Sort Vowels in a String](https://leetcode.com/problems/sort-vowels-in-a-string)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a <strong>0-indexed</strong> string <code>s</code>, <strong>permute</strong> <code>s</code> to get a new string <code>t</code> such that:</p>

<ul>
	<li>All consonants remain in their original places. More formally, if there is an index <code>i</code> with <code>0 &lt;= i &lt; s.length</code> such that <code>s[i]</code> is a consonant, then <code>t[i] = s[i]</code>.</li>
	<li>The vowels must be sorted in the <strong>nondecreasing</strong> order of their <strong>ASCII</strong> values. More formally, for pairs of indices <code>i</code>, <code>j</code> with <code>0 &lt;= i &lt; j &lt; s.length</code> such that <code>s[i]</code> and <code>s[j]</code> are vowels, then <code>t[i]</code> must not have a higher ASCII value than <code>t[j]</code>.</li>
</ul>

<p>Return <em>the resulting string</em>.</p>

<p>The vowels are <code>'a'</code>, <code>'e'</code>, <code>'i'</code>, <code>'o'</code>, and <code>'u'</code>, and they can appear in lowercase or uppercase. Consonants comprise all letters that are not vowels.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "lEetcOde"
<strong>Output:</strong> "lEOtcede"
<strong>Explanation:</strong> 'E', 'O', and 'e' are the vowels in s; 'l', 't', 'c', and 'd' are all consonants. The vowels are sorted according to their ASCII values, and the consonants remain in the same places.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "lYmpH"
<strong>Output:</strong> "lYmpH"
<strong>Explanation:</strong> There are no vowels in s (all characters in s are consonants), so we return "lYmpH".
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code> consists only of letters of the&nbsp;English alphabet&nbsp;in <strong>uppercase and lowercase</strong>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Table`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {string}
 */
const sortVowels = function (s) {
  const n = s.length;
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  const vowelMap = { A: 0, E: 0, I: 0, O: 0, U: 0, a: 0, e: 0, i: 0, o: 0, u: 0 };

  const isVowel = char => vowels.has(char.toLowerCase());

  for (const char of s) {
    if (isVowel(char)) {
      vowelMap[char] += 1;
    }
  }

  const counts = Object.entries(vowelMap);
  const result = s.split('');
  let currentVowel = 0;

  for (let index = 0; index < n; index++) {
    if (!isVowel(s[index])) continue;

    while (!counts[currentVowel][1]) {
      currentVowel += 1;
    }

    result[index] = counts[currentVowel][0];
    counts[currentVowel][1] -= 1;
  }

  return result.join('');
};
```
