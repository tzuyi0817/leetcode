# [648. Replace Words](https://leetcode.com/problems/replace-words)

## Description

<div class="elfjS" data-track-load="description_content"><p>In English, we have a concept called <strong>root</strong>, which can be followed by some other word to form another longer word - let's call this word <strong>derivative</strong>. For example, when the <strong>root</strong> <code>"help"</code> is followed by the word <code>"ful"</code>, we can form a derivative <code>"helpful"</code>.</p>

<p>Given a <code>dictionary</code> consisting of many <strong>roots</strong> and a <code>sentence</code> consisting of words separated by spaces, replace all the derivatives in the sentence with the <strong>root</strong> forming it. If a derivative can be replaced by more than one <strong>root</strong>, replace it with the <strong>root</strong> that has <strong>the shortest length</strong>.</p>

<p>Return <em>the <code>sentence</code></em> after the replacement.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"
<strong>Output:</strong> "the cat was rat by the bat"
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> dictionary = ["a","b","c"], sentence = "aadsfasf absbs bbab cadsfafs"
<strong>Output:</strong> "a a b c"
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= dictionary.length &lt;= 1000</code></li>
	<li><code>1 &lt;= dictionary[i].length &lt;= 100</code></li>
	<li><code>dictionary[i]</code> consists of only lower-case letters.</li>
	<li><code>1 &lt;= sentence.length &lt;= 10<sup>6</sup></code></li>
	<li><code>sentence</code> consists of only lower-case letters and spaces.</li>
	<li>The number of words in <code>sentence</code> is in the range <code>[1, 1000]</code></li>
	<li>The length of each word in <code>sentence</code> is in the range <code>[1, 1000]</code></li>
	<li>Every two consecutive words in <code>sentence</code> will be separated by exactly one space.</li>
	<li><code>sentence</code> does not have leading or trailing spaces.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Trie`**

- Time complexity: <em>O(n+m)</em>
- Space complexity: <em>O(n+m)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string[]} dictionary
 * @param {string} sentence
 * @return {string}
 */
const replaceWords = function (dictionary, sentence) {
  const trie = new Map();
  const words = sentence.split(' ');

  for (const word of dictionary) {
    let current = trie;

    for (const char of word) {
      if (!current.has(char)) {
        current.set(char, new Map());
      }
      current = current.get(char);
    }
    current.set('isWord', true);
  }
  for (let index = 0; index < words.length; index++) {
    let current = trie;
    let root = '';

    for (const char of words[index]) {
      if (current.has('isWord')) {
        words[index] = root;
        break;
      }
      if (!current.has(char)) break;
      current = current.get(char);
      root += char;
    }
  }
  return words.join(' ');
};
```
