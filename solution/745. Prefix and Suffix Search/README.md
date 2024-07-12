# [745. Prefix and Suffix Search](https://leetcode.com/problems/prefix-and-suffix-search)

## Description

<div class="elfjS" data-track-load="description_content"><p>Design a special dictionary that searches the words in it by a prefix and a suffix.</p>

<p>Implement the <code>WordFilter</code> class:</p>

<ul>
	<li><code>WordFilter(string[] words)</code> Initializes the object with the <code>words</code> in the dictionary.</li>
	<li><code>f(string pref, string suff)</code> Returns <em>the index of the word in the dictionary,</em> which has the prefix <code>pref</code> and the suffix <code>suff</code>. If there is more than one valid index, return <strong>the largest</strong> of them. If there is no such word in the dictionary, return <code>-1</code>.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input</strong>
["WordFilter", "f"]
[[["apple"]], ["a", "e"]]
<strong>Output</strong>
[null, 0]
<strong>Explanation</strong>
WordFilter wordFilter = new WordFilter(["apple"]);
wordFilter.f("a", "e"); // return 0, because the word at index 0 has prefix = "a" and suffix = "e".
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= words.length &lt;= 10<sup>4</sup></code></li>
	<li><code>1 &lt;= words[i].length &lt;= 7</code></li>
	<li><code>1 &lt;= pref.length, suff.length &lt;= 7</code></li>
	<li><code>words[i]</code>, <code>pref</code> and <code>suff</code> consist of lowercase English letters only.</li>
	<li>At most <code>10<sup>4</sup></code> calls will be made to the function <code>f</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Trie`**
- Time complexity: <em>O(words.length*word[index].length<sup>2</sup>)</em>
- Space complexity: <em>O(words.length*word[index].length<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string[]} words
 */
var WordFilter = function(words) {
    this.trie = new Map();

    for (let index = 0; index < words.length; index++) {
        const word = words[index];
        let prefix = '';

        for (let left = 0; left < word.length; left++) {
            let current = this.trie;

            prefix += word[left];

            if (!current.has(prefix)) {
               current.set(prefix, new Map()); 
            }
            current = current.get(prefix);

            for (let right = 0; right < word.length; right++) {
                const suffix = word.slice(right);

                current.set(suffix, index);
            }
        }
    }
};

/** 
 * @param {string} pref 
 * @param {string} suff
 * @return {number}
 */
WordFilter.prototype.f = function(pref, suff) {
    if (!this.trie.has(pref)) return -1;

    const current = this.trie.get(pref);

    return current.get(suff) ?? -1;
};

/** 
 * Your WordFilter object will be instantiated and called as such:
 * var obj = new WordFilter(words)
 * var param_1 = obj.f(pref,suff)
 */
```
