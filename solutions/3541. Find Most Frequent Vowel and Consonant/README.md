# [3541. Find Most Frequent Vowel and Consonant](https://leetcode.com/problems/find-most-frequent-vowel-and-consonant)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a string <code>s</code> consisting of lowercase English letters (<code>'a'</code> to <code>'z'</code>). </p>

<p>Your task is to:</p>

<ul>
	<li>Find the vowel (one of <code>'a'</code>, <code>'e'</code>, <code>'i'</code>, <code>'o'</code>, or <code>'u'</code>) with the <strong>maximum</strong> frequency.</li>
	<li>Find the consonant (all other letters excluding vowels) with the <strong>maximum</strong> frequency.</li>
</ul>

<p>Return the sum of the two frequencies.</p>

<p><strong>Note</strong>: If multiple vowels or consonants have the same maximum frequency, you may choose any one of them. If there are no vowels or no consonants in the string, consider their frequency as 0.</p>
The <strong>frequency</strong> of a letter <code>x</code> is the number of times it occurs in the string.
<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "successes"</span></p>

<p><strong>Output:</strong> <span class="example-io">6</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>The vowels are: <code>'u'</code> (frequency 1), <code>'e'</code> (frequency 2). The maximum frequency is 2.</li>
	<li>The consonants are: <code>'s'</code> (frequency 4), <code>'c'</code> (frequency 2). The maximum frequency is 4.</li>
	<li>The output is <code>2 + 4 = 6</code>.</li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "aeiaeia"</span></p>

<p><strong>Output:</strong> <span class="example-io">3</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>The vowels are: <code>'a'</code> (frequency 3), <code>'e'</code> ( frequency 2), <code>'i'</code> (frequency 2). The maximum frequency is 3.</li>
	<li>There are no consonants in <code>s</code>. Hence, maximum consonant frequency = 0.</li>
	<li>The output is <code>3 + 0 = 3</code>.</li>
</ul>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 100</code></li>
	<li><code>s</code> consists of lowercase English letters only.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Map`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
const maxFreqSum = function (s) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const counts = Array.from({ length: 26 }, () => 0);
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  let maxVowel = 0;
  let maxConsonant = 0;

  for (const char of s) {
    const code = char.charCodeAt(0) - BASE_CODE;

    counts[code] += 1;

    if (vowels.has(char)) {
      maxVowel = Math.max(counts[code], maxVowel);
    } else {
      maxConsonant = Math.max(counts[code], maxConsonant);
    }
  }

  return maxVowel + maxConsonant;
};
```
