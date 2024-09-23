# [127. Word Ladder](https://leetcode.com/problems/word-ladder)

## Description

<div class="elfjS" data-track-load="description_content"><p>A <strong>transformation sequence</strong> from word <code>beginWord</code> to word <code>endWord</code> using a dictionary <code>wordList</code> is a sequence of words <code>beginWord -&gt; s<sub>1</sub> -&gt; s<sub>2</sub> -&gt; ... -&gt; s<sub>k</sub></code> such that:</p>

<ul>
	<li>Every adjacent pair of words differs by a single letter.</li>
	<li>Every <code>s<sub>i</sub></code> for <code>1 &lt;= i &lt;= k</code> is in <code>wordList</code>. Note that <code>beginWord</code> does not need to be in <code>wordList</code>.</li>
	<li><code>s<sub>k</sub> == endWord</code></li>
</ul>

<p>Given two words, <code>beginWord</code> and <code>endWord</code>, and a dictionary <code>wordList</code>, return <em>the <strong>number of words</strong> in the <strong>shortest transformation sequence</strong> from</em> <code>beginWord</code> <em>to</em> <code>endWord</code><em>, or </em><code>0</code><em> if no such sequence exists.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
<strong>Output:</strong> 5
<strong>Explanation:</strong> One shortest transformation sequence is "hit" -&gt; "hot" -&gt; "dot" -&gt; "dog" -&gt; cog", which is 5 words long.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
<strong>Output:</strong> 0
<strong>Explanation:</strong> The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= beginWord.length &lt;= 10</code></li>
	<li><code>endWord.length == beginWord.length</code></li>
	<li><code>1 &lt;= wordList.length &lt;= 5000</code></li>
	<li><code>wordList[i].length == beginWord.length</code></li>
	<li><code>beginWord</code>, <code>endWord</code>, and <code>wordList[i]</code> consist of lowercase English letters.</li>
	<li><code>beginWord != endWord</code></li>
	<li>All the words in <code>wordList</code> are <strong>unique</strong>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Breadth-First Search`**
- Time complexity: <em>O(n*26<sup>word.length</sup>)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function(beginWord, endWord, wordList) {
    if (!wordList.includes(endWord)) return 0;
    const BASE_CHAR_CODE = 'a'.charCodeAt(0);
    const wordSet = new Set(wordList);
    let queue = [beginWord];
    let result = 1;

    while (queue.length) {
        const nextQueue = [];

        for (const word of queue) {
            for (let index = 0; index < word.length; index++) {
                for (let code = BASE_CHAR_CODE; code < BASE_CHAR_CODE + 26; code++) {
                    const s = String.fromCharCode(code);
                    const targetWord = `${word.slice(0, index)}${s}${word.slice(index + 1)}`;

                    if (!wordSet.has(targetWord)) continue;
                    if (targetWord === endWord) return result + 1;
                    wordSet.delete(targetWord);
                    nextQueue.push(targetWord);
                }
            }
        }
        queue = nextQueue;
        result += 1;
    }
    return 0;
};
```
