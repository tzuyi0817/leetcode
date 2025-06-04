# [3403. Find the Lexicographically Largest String From the Box I](https://leetcode.com/problems/find-the-lexicographically-largest-string-from-the-box-i)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a string <code>word</code>, and an integer <code>numFriends</code>.</p>

<p>Alice is organizing a game for her <code>numFriends</code> friends. There are multiple rounds in the game, where in each round:</p>

<ul>
	<li><code>word</code> is split into <code>numFriends</code> <strong>non-empty</strong> strings, such that no previous round has had the <strong>exact</strong> same split.</li>
	<li>All the split words are put into a box.</li>
</ul>

<p>Find the <span data-keyword="lexicographically-smaller-string" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:rj:" data-state="closed" class="">lexicographically largest</button></span> string from the box after all the rounds are finished.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">word = "dbca", numFriends = 2</span></p>

<p><strong>Output:</strong> <span class="example-io">"dbc"</span></p>

<p><strong>Explanation:</strong>&nbsp;</p>

<p>All possible splits are:</p>

<ul>
	<li><code>"d"</code> and <code>"bca"</code>.</li>
	<li><code>"db"</code> and <code>"ca"</code>.</li>
	<li><code>"dbc"</code> and <code>"a"</code>.</li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">word = "gggg", numFriends = 4</span></p>

<p><strong>Output:</strong> <span class="example-io">"g"</span></p>

<p><strong>Explanation:</strong>&nbsp;</p>

<p>The only possible split is: <code>"g"</code>, <code>"g"</code>, <code>"g"</code>, and <code>"g"</code>.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= word.length &lt;= 5&nbsp;* 10<sup>3</sup></code></li>
	<li><code>word</code> consists only of lowercase English letters.</li>
	<li><code>1 &lt;= numFriends &lt;= word.length</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} word
 * @param {number} numFriends
 * @return {string}
 */
const answerString = function (word, numFriends) {
  if (numFriends === 1) return word;
  const n = word.length;
  let result = '';

  for (let index = 0; index < n; index++) {
    if (result[0] > word[index]) continue;
    const needSplit = Math.max(numFriends - index - 1, 0);
    const splitWord = word.slice(index, n - needSplit);

    if (splitWord > result) {
      result = splitWord;
    }
  }

  return result;
};
```
