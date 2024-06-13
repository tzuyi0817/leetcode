# [472. Concatenated Words](https://leetcode.com/problems/concatenated-words)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an array of strings <code>words</code> (<strong>without duplicates</strong>), return <em>all the <strong>concatenated words</strong> in the given list of</em> <code>words</code>.</p>

<p>A <strong>concatenated word</strong> is defined as a string that is comprised entirely of at least two shorter words (not necessarily distinct)&nbsp;in the given array.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]
<strong>Output:</strong> ["catsdogcats","dogcatsdog","ratcatdogcat"]
<strong>Explanation:</strong> "catsdogcats" can be concatenated by "cats", "dog" and "cats"; 
"dogcatsdog" can be concatenated by "dog", "cats" and "dog"; 
"ratcatdogcat" can be concatenated by "rat", "cat", "dog" and "cat".</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> words = ["cat","dog","catdog"]
<strong>Output:</strong> ["catdog"]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= words.length &lt;= 10<sup>4</sup></code></li>
	<li><code>1 &lt;= words[i].length &lt;= 30</code></li>
	<li><code>words[i]</code> consists of only lowercase English letters.</li>
	<li>All the strings of <code>words</code> are <strong>unique</strong>.</li>
	<li><code>1 &lt;= sum(words[i].length) &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Depth-First Search`**
- Time complexity: <em>O(n*word.length<sup>2</sup>)</em>
- Space complexity: <em>O(n*word.length)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string[]} words
 * @return {string[]}
 */
var findAllConcatenatedWordsInADict = function(words) {
    const wordsSet = new Set(words);
    const memo = new Map();
    const result = [];

    const isConcatenatedWord = (word) => {
        if (memo.has(word)) return memo.get(word);

        for (let index = 0; index < word.length; index++) {
            const prefix = word.slice(0, index + 1);

            if (!wordsSet.has(prefix)) continue;
            const suffix = word.slice(index + 1);

            if (wordsSet.has(suffix) || isConcatenatedWord(suffix)) {
                memo.set(word, true);
                return true;
            }
        }
        memo.set(word, false)
        return false;
    };

    for (const word of words) {
        if (!isConcatenatedWord(word)) continue;
        result.push(word);
    }
    return result;
};
```
