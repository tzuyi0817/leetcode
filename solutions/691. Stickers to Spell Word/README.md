# [691. Stickers to Spell Word](https://leetcode.com/problems/stickers-to-spell-word)

## Description

<div class="elfjS" data-track-load="description_content"><p>We are given <code>n</code> different types of <code>stickers</code>. Each sticker has a lowercase English word on it.</p>

<p>You would like to spell out the given string <code>target</code> by cutting individual letters from your collection of stickers and rearranging them. You can use each sticker more than once if you want, and you have infinite quantities of each sticker.</p>

<p>Return <em>the minimum number of stickers that you need to spell out </em><code>target</code>. If the task is impossible, return <code>-1</code>.</p>

<p><strong>Note:</strong> In all test cases, all words were chosen randomly from the <code>1000</code> most common US English words, and <code>target</code> was chosen as a concatenation of two random words.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> stickers = ["with","example","science"], target = "thehat"
<strong>Output:</strong> 3
<strong>Explanation:</strong>
We can use 2 "with" stickers, and 1 "example" sticker.
After cutting and rearrange the letters of those stickers, we can form the target "thehat".
Also, this is the minimum number of stickers necessary to form the target string.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> stickers = ["notice","possible"], target = "basicbasic"
<strong>Output:</strong> -1
Explanation:
We cannot form the target "basicbasic" from cutting letters from the given stickers.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == stickers.length</code></li>
	<li><code>1 &lt;= n &lt;= 50</code></li>
	<li><code>1 &lt;= stickers[i].length &lt;= 10</code></li>
	<li><code>1 &lt;= target.length &lt;= 15</code></li>
	<li><code>stickers[i]</code> and <code>target</code> consist of lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Backtracking`**

- Time complexity: <em>O(n*(stickers[i].length)*2<sup>target.length</sup>)</em>
- Space complexity: <em>O(2<sup>target.length</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string[]} stickers
 * @param {string} target
 * @return {number}
 */
const minStickers = function (stickers, target) {
  const memo = new Map();

  const getRestWord = (word, sticker) => {
    for (const char of sticker) {
      if (!word.includes(char)) continue;
      word = word.replace(char, '');
    }
    return word;
  };

  const spellWord = word => {
    if (!word) return 0;
    if (memo.has(word)) return memo.get(word);

    let count = Number.MAX_SAFE_INTEGER;

    for (const sticker of stickers) {
      if (!sticker.includes(word[0])) continue;

      const restWord = getRestWord(word, sticker);

      count = Math.min(spellWord(restWord) + 1, count);
    }
    const result = count === Number.MAX_SAFE_INTEGER || !count ? -1 : count;

    memo.set(word, result);
    return result;
  };

  return spellWord(target);
};
```
