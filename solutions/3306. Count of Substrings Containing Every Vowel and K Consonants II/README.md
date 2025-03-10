# [3306. Count of Substrings Containing Every Vowel and K Consonants II](https://leetcode.com/problems/count-of-substrings-containing-every-vowel-and-k-consonants-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a string <code>word</code> and a <strong>non-negative</strong> integer <code>k</code>.</p>

<p>Return the total number of <span data-keyword="substring-nonempty" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:rg:" data-state="closed" class="">substrings</button></span> of <code>word</code> that contain every vowel (<code>'a'</code>, <code>'e'</code>, <code>'i'</code>, <code>'o'</code>, and <code>'u'</code>) <strong>at least</strong> once and <strong>exactly</strong> <code>k</code> consonants.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">word = "aeioqq", k = 1</span></p>

<p><strong>Output:</strong> <span class="example-io">0</span></p>

<p><strong>Explanation:</strong></p>

<p>There is no substring with every vowel.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">word = "aeiou", k = 0</span></p>

<p><strong>Output:</strong> <span class="example-io">1</span></p>

<p><strong>Explanation:</strong></p>

<p>The only substring with every vowel and zero consonants is <code>word[0..4]</code>, which is <code>"aeiou"</code>.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">word = "</span>ieaouqqieaouqq<span class="example-io">", k = 1</span></p>

<p><strong>Output:</strong> 3</p>

<p><strong>Explanation:</strong></p>

<p>The substrings with every vowel and one consonant are:</p>

<ul>
	<li><code>word[0..5]</code>, which is <code>"ieaouq"</code>.</li>
	<li><code>word[6..11]</code>, which is <code>"qieaou"</code>.</li>
	<li><code>word[7..12]</code>, which is <code>"ieaouq"</code>.</li>
</ul>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>5 &lt;= word.length &lt;= 2 * 10<sup>5</sup></code></li>
	<li><code>word</code> consists only of lowercase English letters.</li>
	<li><code>0 &lt;= k &lt;= word.length - 5</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Sliding Window`**

- Time complexity: <em>O(n+n -> n)</em>
- Space complexity: <em>O(5 -> 1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
const countOfSubstrings = function (word, k) {
  const n = word.length;
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  const isVowel = letter => vowels.includes(letter);

  const atMost = consonants => {
    const vowelMap = new Map();
    let left = 0;
    let consonantCount = 0;
    let result = 0;

    for (let index = 0; index < n; index++) {
      const letter = word[index];

      if (isVowel(letter)) {
        const count = vowelMap.get(letter) ?? 0;

        vowelMap.set(letter, count + 1);
      } else {
        consonantCount += 1;
      }

      while (vowelMap.size === vowels.length && consonantCount > consonants) {
        const current = word[left];

        if (isVowel(current)) {
          const count = vowelMap.get(current);

          count === 1 ? vowelMap.delete(current) : vowelMap.set(current, count - 1);
        } else {
          consonantCount -= 1;
        }

        left += 1;
      }

      result += index - left + 1;
    }

    return result;
  };

  return atMost(k) - atMost(k - 1);
};
```
