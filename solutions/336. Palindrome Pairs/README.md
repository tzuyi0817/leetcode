# [336. Palindrome Pairs](https://leetcode.com/problems/palindrome-pairs)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a <strong>0-indexed</strong> array of <strong>unique</strong> strings <code>words</code>.</p>

<p>A <strong>palindrome pair</strong> is a pair of integers <code>(i, j)</code> such that:</p>

<ul>
	<li><code>0 &lt;= i, j &lt; words.length</code>,</li>
	<li><code>i != j</code>, and</li>
	<li><code>words[i] + words[j]</code> (the concatenation of the two strings) is a <span data-keyword="palindrome-string" class=" cursor-pointer relative text-dark-blue-s text-sm"><div class="popover-wrapper inline-block" data-headlessui-state=""><div><div aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:rl:"><div>palindrome</div></div><div style="position: fixed; z-index: 40; inset: 0px auto auto 0px; transform: translate(78px, 344px);"></div></div></div></span>.</li>
</ul>

<p>Return <em>an array of all the <strong>palindrome pairs</strong> of </em><code>words</code>.</p>

<p>You must write an algorithm with&nbsp;<code>O(sum of words[i].length)</code>&nbsp;runtime complexity.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> words = ["abcd","dcba","lls","s","sssll"]
<strong>Output:</strong> [[0,1],[1,0],[3,2],[2,4]]
<strong>Explanation:</strong> The palindromes are ["abcddcba","dcbaabcd","slls","llssssll"]
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> words = ["bat","tab","cat"]
<strong>Output:</strong> [[0,1],[1,0]]
<strong>Explanation:</strong> The palindromes are ["battab","tabbat"]
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> words = ["a",""]
<strong>Output:</strong> [[0,1],[1,0]]
<strong>Explanation:</strong> The palindromes are ["a","a"]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= words.length &lt;= 5000</code></li>
	<li><code>0 &lt;= words[i].length &lt;= 300</code></li>
	<li><code>words[i]</code> consists of lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Table`**

- Time complexity: <em>O(n\*words[i].length<sup>2</sup>)</em>
- Space complexity: <em>O(n\*words[i].length)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string[]} words
 * @return {number[][]}
 */
const palindromePairs = function (words) {
  const wordMap = new Map();
  const wordSizeSet = new Set();
  const isPalindrome = (word, left, right) => {
    while (left < right) {
      if (word[left] !== word[right]) return false;
      left += 1;
      right -= 1;
    }
    return true;
  };
  const result = [];

  for (const [index, word] of words.entries()) {
    wordMap.set(word, index);
    wordSizeSet.add(word.length);
  }

  for (const [index, word] of words.entries()) {
    const size = word.length;
    const reverseWord = word.split('').toReversed().join('');
    const reverseWordIndex = wordMap.get(reverseWord);

    if (reverseWordIndex !== undefined && reverseWordIndex !== index) {
      result.push([index, reverseWordIndex]);
    }
    for (let length = 0; length < size; length++) {
      if (!wordSizeSet.has(length)) continue;
      if (isPalindrome(reverseWord, 0, size - length - 1)) {
        const subWord = reverseWord.slice(size - length);

        if (wordMap.has(subWord)) {
          result.push([index, wordMap.get(subWord)]);
        }
      }
      if (isPalindrome(reverseWord, length, size - 1)) {
        const subWord = reverseWord.slice(0, length);

        if (wordMap.has(subWord)) {
          result.push([wordMap.get(subWord), index]);
        }
      }
    }
  }
  return result;
};
```
