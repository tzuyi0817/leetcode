# [126. Word Ladder II](https://leetcode.com/problems/word-ladder-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>A <strong>transformation sequence</strong> from word <code>beginWord</code> to word <code>endWord</code> using a dictionary <code>wordList</code> is a sequence of words <code>beginWord -&gt; s<sub>1</sub> -&gt; s<sub>2</sub> -&gt; ... -&gt; s<sub>k</sub></code> such that:</p>

<ul>
	<li>Every adjacent pair of words differs by a single letter.</li>
	<li>Every <code>s<sub>i</sub></code> for <code>1 &lt;= i &lt;= k</code> is in <code>wordList</code>. Note that <code>beginWord</code> does not need to be in <code>wordList</code>.</li>
	<li><code>s<sub>k</sub> == endWord</code></li>
</ul>

<p>Given two words, <code>beginWord</code> and <code>endWord</code>, and a dictionary <code>wordList</code>, return <em>all the <strong>shortest transformation sequences</strong> from</em> <code>beginWord</code> <em>to</em> <code>endWord</code><em>, or an empty list if no such sequence exists. Each sequence should be returned as a list of the words </em><code>[beginWord, s<sub>1</sub>, s<sub>2</sub>, ..., s<sub>k</sub>]</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
<strong>Output:</strong> [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
<strong>Explanation:</strong>&nbsp;There are 2 shortest transformation sequences:
"hit" -&gt; "hot" -&gt; "dot" -&gt; "dog" -&gt; "cog"
"hit" -&gt; "hot" -&gt; "lot" -&gt; "log" -&gt; "cog"
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
<strong>Output:</strong> []
<strong>Explanation:</strong> The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= beginWord.length &lt;= 5</code></li>
	<li><code>endWord.length == beginWord.length</code></li>
	<li><code>1 &lt;= wordList.length &lt;= 500</code></li>
	<li><code>wordList[i].length == beginWord.length</code></li>
	<li><code>beginWord</code>, <code>endWord</code>, and <code>wordList[i]</code> consist of lowercase English letters.</li>
	<li><code>beginWord != endWord</code></li>
	<li>All the words in <code>wordList</code> are <strong>unique</strong>.</li>
	<li>The <strong>sum</strong> of all shortest transformation sequences does not exceed <code>10<sup>5</sup></code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Breadth-First Search`**
- Time complexity: <em>O(n*word.length<sup>26</sup>)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
var findLadders = function(beginWord, endWord, wordList) {
    const BASE_CHAR_CODE = 'a'.charCodeAt(0);
    const wordSet = new Set(wordList);

    if (!wordSet.has(endWord)) return [];
    const sequences = [];
    let queue = [beginWord];
    let reached = false;

    wordSet.delete(beginWord);

    while (queue.length && !reached) {
        const nextQueue = [];

        sequences.push(queue);
        for (const word of queue) {
            for (let index = 0; index < word.length; index++) {
                for (let code = BASE_CHAR_CODE; code < BASE_CHAR_CODE + 26; code++) {
                    const letter = String.fromCharCode(code);
                    const nextWord = `${word.slice(0, index)}${letter}${word.slice(index + 1)}`;

                    if (!wordSet.has(nextWord)) continue;
                    if (nextWord === endWord) {
                        reached = true;
                        break;
                    }
                    nextQueue.push(nextWord);
                    wordSet.delete(nextWord);
                }
                if (reached) break;
            }
        }
        queue = nextQueue;
    }
    if (!reached) return [];

    const result = [[endWord]];
    const isValid = (a, b) => {
        let diff = 0;

        for (let index = 0; index < a.length; index++) {
            if (a[index] !== b[index]) diff += 1;
            if (diff > 1) return false;
        }
        return diff === 1;
    };

    for (let step = sequences.length - 1; step >= 0; step--) {
        const size = result.length;

        for (let index = 0; index < size; index++) {
            const path = result.shift();
            const nextWord = path[0];

            for (const word of sequences[step]) {
                if (!isValid(word, nextWord)) continue;
                result.push([word, ...path]);
            }
        }
    }
    return result;
};
```
