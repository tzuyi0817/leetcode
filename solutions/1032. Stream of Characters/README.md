# [1032. Stream of Characters](https://leetcode.com/problems/stream-of-characters)

## Description

<div class="elfjS" data-track-load="description_content"><p>Design an algorithm that accepts a stream of characters and checks if a suffix of these characters is a string of a given array of strings <code>words</code>.</p>

<p>For example, if <code>words = ["abc", "xyz"]</code>&nbsp;and the stream added the four characters (one by one) <code>'a'</code>, <code>'x'</code>, <code>'y'</code>, and <code>'z'</code>, your algorithm should detect that the suffix <code>"xyz"</code> of the characters <code>"axyz"</code> matches <code>"xyz"</code> from <code>words</code>.</p>

<p>Implement the <code>StreamChecker</code> class:</p>

<ul>
	<li><code>StreamChecker(String[] words)</code> Initializes the object with the strings array <code>words</code>.</li>
	<li><code>boolean query(char letter)</code> Accepts a new character from the stream and returns <code>true</code> if any non-empty suffix from the stream forms a word that is in <code>words</code>.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input</strong>
["StreamChecker", "query", "query", "query", "query", "query", "query", "query", "query", "query", "query", "query", "query"]
[[["cd", "f", "kl"]], ["a"], ["b"], ["c"], ["d"], ["e"], ["f"], ["g"], ["h"], ["i"], ["j"], ["k"], ["l"]]
<strong>Output</strong>
[null, false, false, false, true, false, true, false, false, false, false, false, true]

<strong>Explanation</strong>
StreamChecker streamChecker = new StreamChecker(["cd", "f", "kl"]);
streamChecker.query("a"); // return False
streamChecker.query("b"); // return False
streamChecker.query("c"); // return False
streamChecker.query("d"); // return True, because 'cd' is in the wordlist
streamChecker.query("e"); // return False
streamChecker.query("f"); // return True, because 'f' is in the wordlist
streamChecker.query("g"); // return False
streamChecker.query("h"); // return False
streamChecker.query("i"); // return False
streamChecker.query("j"); // return False
streamChecker.query("k"); // return False
streamChecker.query("l"); // return True, because 'kl' is in the wordlist
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= words.length &lt;= 2000</code></li>
	<li><code>1 &lt;= words[i].length &lt;= 200</code></li>
	<li><code>words[i]</code> consists of lowercase English letters.</li>
	<li><code>letter</code> is a lowercase English letter.</li>
	<li>At most <code>4 * 10<sup>4</sup></code> calls will be made to query.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Trie`**

- Time complexity:
  - constructor: <em>O(words.length\*words[i].length)</em>
  - query: <em>O(query call times)</em>
- Space complexity: <em>O(n)</em>
  - constructor: <em>O(words.length\*words[i].length)</em>
  - query: <em>O(query call times)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string[]} words
 */
const StreamChecker = function (words) {
  const trie = {};

  for (const word of words) {
    const n = word.length;
    let current = trie;

    for (let index = n - 1; index >= 0; index--) {
      const letter = word[index];

      if (!current[letter]) {
        current[letter] = {};
      }
      current = current[letter];
    }
    current.isWord = true;
  }

  this.trie = trie;
  this.stream = [];
};

/**
 * @param {character} letter
 * @return {boolean}
 */
StreamChecker.prototype.query = function (letter) {
  this.stream.push(letter);

  const n = this.stream.length;
  let current = this.trie;

  for (let index = n - 1; index >= 0; index--) {
    const char = this.stream[index];

    if (!current[char]) return false;

    current = current[char];
    if (current.isWord) return true;
  }
  return false;
};

/**
 * Your StreamChecker object will be instantiated and called as such:
 * var obj = new StreamChecker(words)
 * var param_1 = obj.query(letter)
 */
```
