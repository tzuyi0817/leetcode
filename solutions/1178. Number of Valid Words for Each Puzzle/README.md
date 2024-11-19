# [1178. Number of Valid Words for Each Puzzle](https://leetcode.com/problems/number-of-valid-words-for-each-puzzle)

## Description

<div class="elfjS" data-track-load="description_content">With respect to a given <code>puzzle</code> string, a <code>word</code> is <em>valid</em> if both the following conditions are satisfied:
<ul>
	<li><code>word</code> contains the first letter of <code>puzzle</code>.</li>
	<li>For each letter in <code>word</code>, that letter is in <code>puzzle</code>.
	<ul>
		<li>For example, if the puzzle is <code>"abcdefg"</code>, then valid words are <code>"faced"</code>, <code>"cabbage"</code>, and <code>"baggage"</code>, while</li>
		<li>invalid words are <code>"beefed"</code> (does not include <code>'a'</code>) and <code>"based"</code> (includes <code>'s'</code> which is not in the puzzle).</li>
	</ul>
	</li>
</ul>
Return <em>an array </em><code>answer</code><em>, where </em><code>answer[i]</code><em> is the number of words in the given word list </em><code>words</code><em> that is valid with respect to the puzzle </em><code>puzzles[i]</code>.
<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> words = ["aaaa","asas","able","ability","actt","actor","access"], puzzles = ["aboveyz","abrodyz","abslute","absoryz","actresz","gaswxyz"]
<strong>Output:</strong> [1,1,3,2,4,0]
<strong>Explanation:</strong> 
1 valid word for "aboveyz" : "aaaa" 
1 valid word for "abrodyz" : "aaaa"
3 valid words for "abslute" : "aaaa", "asas", "able"
2 valid words for "absoryz" : "aaaa", "asas"
4 valid words for "actresz" : "aaaa", "asas", "actt", "access"
There are no valid words for "gaswxyz" cause none of the words in the list contains letter 'g'.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> words = ["apple","pleas","please"], puzzles = ["aelwxyz","aelpxyz","aelpsxy","saelpxy","xaelpsy"]
<strong>Output:</strong> [0,1,3,2,0]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= words.length &lt;= 10<sup>5</sup></code></li>
	<li><code>4 &lt;= words[i].length &lt;= 50</code></li>
	<li><code>1 &lt;= puzzles.length &lt;= 10<sup>4</sup></code></li>
	<li><code>puzzles[i].length == 7</code></li>
	<li><code>words[i]</code> and <code>puzzles[i]</code> consist of lowercase English letters.</li>
	<li>Each <code>puzzles[i] </code>does not contain repeated characters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Bit Manipulation`**

- Time complexity: <em>O(words.length + puzzles.length)</em>
- Space complexity: <em>O(words.length)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string[]} words
 * @param {string[]} puzzles
 * @return {number[]}
 */
const findNumOfValidWords = function (words, puzzles) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const maskMap = new Map();

  const getCode = letter => letter.charCodeAt(0) - BASE_CODE;

  for (const word of words) {
    let mask = 0;

    for (const letter of word) {
      mask |= 1 << getCode(letter);
    }
    maskMap.set(mask, (maskMap.get(mask) ?? 0) + 1);
  }

  return puzzles.map(puzzle => {
    let puzzleMask = 0;

    for (const letter of puzzle) {
      puzzleMask |= 1 << getCode(letter);
    }
    const firstMask = 1 << getCode(puzzle[0]);
    let subMask = puzzleMask;
    let result = 0;

    while (subMask) {
      if ((subMask & firstMask) === firstMask) {
        result += maskMap.get(subMask) ?? 0;
      }
      subMask = (subMask - 1) & puzzleMask;
    }
    return result;
  });
};
```
