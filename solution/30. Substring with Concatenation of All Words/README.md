# [30. Substring with Concatenation of All Words](https://leetcode.com/problems/substring-with-concatenation-of-all-words)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a string <code>s</code> and an array of strings <code>words</code>. All the strings of <code>words</code> are of <strong>the same length</strong>.</p>

<p>A <strong>concatenated string</strong> is a string that exactly contains all the strings of any permutation of <code>words</code> concatenated.</p>

<ul>
	<li>For example, if <code>words = ["ab","cd","ef"]</code>, then <code>"abcdef"</code>, <code>"abefcd"</code>, <code>"cdabef"</code>, <code>"cdefab"</code>, <code>"efabcd"</code>, and <code>"efcdab"</code> are all concatenated strings. <code>"acdbef"</code> is not a concatenated string because it is not the concatenation of any permutation of <code>words</code>.</li>
</ul>

<p>Return an array of <em>the starting indices</em> of all the concatenated substrings in <code>s</code>. You can return the answer in <strong>any order</strong>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "barfoothefoobarman", words = ["foo","bar"]</span></p>

<p><strong>Output:</strong> <span class="example-io">[0,9]</span></p>

<p><strong>Explanation:</strong></p>

<p>The substring starting at 0 is <code>"barfoo"</code>. It is the concatenation of <code>["bar","foo"]</code> which is a permutation of <code>words</code>.<br>
The substring starting at 9 is <code>"foobar"</code>. It is the concatenation of <code>["foo","bar"]</code> which is a permutation of <code>words</code>.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]</span></p>

<p><strong>Output:</strong> <span class="example-io">[]</span></p>

<p><strong>Explanation:</strong></p>

<p>There is no concatenated substring.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]</span></p>

<p><strong>Output:</strong> <span class="example-io">[6,9,12]</span></p>

<p><strong>Explanation:</strong></p>

<p>The substring starting at 6 is <code>"foobarthe"</code>. It is the concatenation of <code>["foo","bar","the"]</code>.<br>
The substring starting at 9 is <code>"barthefoo"</code>. It is the concatenation of <code>["bar","the","foo"]</code>.<br>
The substring starting at 12 is <code>"thefoobar"</code>. It is the concatenation of <code>["the","foo","bar"]</code>.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>
	<li><code>1 &lt;= words.length &lt;= 5000</code></li>
	<li><code>1 &lt;= words[i].length &lt;= 30</code></li>
	<li><code>s</code> and <code>words[i]</code> consist of lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Sliding Window + Hash Map`**
- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function(s, words) {
    const wordsMap = words.reduce((map, word) => {
        const count = map.get(word) ?? 0;

        return map.set(word, count + 1);
    }, new Map());
    const currentMap = new Map();
    const n = s.length;
    const length = words[0].length;
    const result = [];
    const getSubStrCount = (str) => currentMap.get(str) ?? 0;

    for (let start = 0; start < length; start++) {
        let left = start;
        let currentCount = 0;

        for (let index = start; index <= n - length; index += length) {
            const subStr = s.slice(index, index + length);
            const count = wordsMap.get(subStr);

            if (count) {
                currentMap.set(subStr, getSubStrCount(subStr) + 1);
                if (getSubStrCount(subStr) <= count) currentCount += 1;
                else {
                    while (getSubStrCount(subStr) > count) {
                        const leftSubStr = s.slice(left, left + length);

                        currentMap.set(leftSubStr, getSubStrCount(leftSubStr) - 1);
                        left += length;
                        if (getSubStrCount(leftSubStr) >= wordsMap.get(leftSubStr)) continue;
                        currentCount -= 1;
                    }
                }
                if (currentCount === words.length) {
                    const leftSubStr = s.slice(left, left + length);

                    result.push(left);
                    currentMap.set(leftSubStr, getSubStrCount(leftSubStr) - 1);
                    currentCount -= 1;
                    left += length;
                }
                continue;
            }
            currentCount = 0;
            currentMap.clear();
            left = index + length;
        }
        currentMap.clear();
    }
    return result;
};
```
