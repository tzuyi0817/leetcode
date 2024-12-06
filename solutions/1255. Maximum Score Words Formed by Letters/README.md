# [1255. Maximum Score Words Formed by Letters](https://leetcode.com/problems/maximum-score-words-formed-by-letters)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a list of <code>words</code>, list of&nbsp; single&nbsp;<code>letters</code> (might be repeating)&nbsp;and <code>score</code>&nbsp;of every character.</p>

<p>Return the maximum score of <strong>any</strong> valid set of words formed by using the given letters (<code>words[i]</code> cannot be used two&nbsp;or more times).</p>

<p>It is not necessary to use all characters in <code>letters</code> and each letter can only be used once. Score of letters&nbsp;<code>'a'</code>, <code>'b'</code>, <code>'c'</code>, ... ,<code>'z'</code> is given by&nbsp;<code>score[0]</code>, <code>score[1]</code>, ... , <code>score[25]</code> respectively.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> words = ["dog","cat","dad","good"], letters = ["a","a","c","d","d","d","g","o","o"], score = [1,0,9,5,0,0,3,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0]
<strong>Output:</strong> 23
<strong>Explanation:</strong>
Score  a=1, c=9, d=5, g=3, o=2
Given letters, we can form the words "dad" (5+1+5) and "good" (3+2+2+5) with a score of 23.
Words "dad" and "dog" only get a score of 21.</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> words = ["xxxz","ax","bx","cx"], letters = ["z","a","b","c","x","x","x"], score = [4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,10]
<strong>Output:</strong> 27
<strong>Explanation:</strong>
Score  a=4, b=4, c=4, x=5, z=10
Given letters, we can form the words "ax" (4+5), "bx" (4+5) and "cx" (4+5) with a score of 27.
Word "xxxz" only get a score of 25.</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> words = ["leetcode"], letters = ["l","e","t","c","o","d"], score = [0,0,1,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0]
<strong>Output:</strong> 0
<strong>Explanation:</strong>
Letter "e" can only be used once.</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= words.length &lt;= 14</code></li>
	<li><code>1 &lt;= words[i].length &lt;= 15</code></li>
	<li><code>1 &lt;= letters.length &lt;= 100</code></li>
	<li><code>letters[i].length == 1</code></li>
	<li><code>score.length ==&nbsp;26</code></li>
	<li><code>0 &lt;= score[i] &lt;= 10</code></li>
	<li><code>words[i]</code>, <code>letters[i]</code>&nbsp;contains only lower case English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Backtracking`**

- Time complexity: <em>O(n\*2<sup>n</sup>\*words[i].length)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string[]} words
 * @param {character[]} letters
 * @param {number[]} score
 * @return {number}
 */
const maxScoreWords = function (words, letters, score) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const n = words.length;

  const getCode = letter => letter.charCodeAt(0) - BASE_CODE;

  const wordScores = words.map(word => {
    let result = 0;

    for (const letter of word) {
      result += score[getCode(letter)];
    }
    return result;
  });
  const letterCounts = Array.from({ length: 26 }, () => 0);

  for (const letter of letters) {
    letterCounts[getCode(letter)] += 1;
  }

  const useOrUnuseWord = (word, count) => {
    let isValid = true;

    for (const letter of word) {
      const code = getCode(letter);

      if (!letterCounts[code]) {
        isValid = false;
      }
      letterCounts[code] += count;
    }
    return isValid;
  };

  const getScore = start => {
    if (start >= n) return 0;
    let result = 0;

    for (let index = start; index < n; index++) {
      const word = words[index];
      const isValid = useOrUnuseWord(word, -1);

      if (isValid) {
        const nextScore = wordScores[index] + getScore(index + 1);

        result = Math.max(nextScore, result);
      }
      useOrUnuseWord(word, 1);
    }
    return result;
  };

  return getScore(0);
};
```
