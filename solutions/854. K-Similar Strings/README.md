# [854. K-Similar Strings](https://leetcode.com/problems/k-similar-strings)

## Description

<div class="elfjS" data-track-load="description_content"><p>Strings <code>s1</code> and <code>s2</code> are <code>k</code><strong>-similar</strong> (for some non-negative integer <code>k</code>) if we can swap the positions of two letters in <code>s1</code> exactly <code>k</code> times so that the resulting string equals <code>s2</code>.</p>

<p>Given two anagrams <code>s1</code> and <code>s2</code>, return the smallest <code>k</code> for which <code>s1</code> and <code>s2</code> are <code>k</code><strong>-similar</strong>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s1 = "ab", s2 = "ba"
<strong>Output:</strong> 1
<strong>Explanation:</strong> The two string are 1-similar because we can use one swap to change s1 to s2: "ab" --&gt; "ba".
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s1 = "abc", s2 = "bca"
<strong>Output:</strong> 2
<strong>Explanation:</strong> The two strings are 2-similar because we can use two swaps to change s1 to s2: "abc" --&gt; "bac" --&gt; "bca".
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s1.length &lt;= 20</code></li>
	<li><code>s2.length == s1.length</code></li>
	<li><code>s1</code> and <code>s2</code> contain only lowercase letters from the set <code>{'a', 'b', 'c', 'd', 'e', 'f'}</code>.</li>
	<li><code>s2</code> is an anagram of <code>s1</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Breadth-First Search`**

- Time complexity: <em>O(n<sup>2</sup>k)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
const kSimilarity = function (s1, s2) {
  if (s1 === s2) return 0;
  const n = s1.length;
  const visited = new Set([s1]);
  let queue = [s1];
  let result = 0;

  while (queue.length) {
    const nextQueue = [];

    for (const word of queue) {
      let a = 0;

      while (a < n && word[a] === s2[a]) a += 1;

      for (let b = a + 1; b < n; b++) {
        if (word[b] === s2[b]) continue;
        if (word[a] !== s2[b]) continue;
        const startWord = word.slice(0, a);
        const middleWord = word.slice(a + 1, b);
        const endWord = word.slice(b + 1);
        const nextWord = `${startWord}${word[b]}${middleWord}${word[a]}${endWord}`;

        if (nextWord === s2) return result + 1;
        if (visited.has(nextWord)) continue;
        visited.add(nextWord);
        nextQueue.push(nextWord);
      }
    }
    queue = nextQueue;
    result += 1;
  }
  return -1;
};
```
