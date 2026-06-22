# [1189. Maximum Number of Balloons](https://leetcode.com/problems/maximum-number-of-balloons)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>Given a string <code>text</code>, you want to use the characters of <code>text</code> to form as many instances of the word <strong>"balloon"</strong> as possible.</p>

<p>You can use each character in <code>text</code> <strong>at most once</strong>. Return the maximum number of instances that can be formed.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2019/09/05/1536_ex1_upd.JPG" style="width: 132px; height: 35px;"></strong></p>

<pre><strong>Input:</strong> text = "nlaebolko"
<strong>Output:</strong> 1
</pre>

<p><strong class="example">Example 2:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2019/09/05/1536_ex2_upd.JPG" style="width: 267px; height: 35px;"></strong></p>

<pre><strong>Input:</strong> text = "loonbalxballpoon"
<strong>Output:</strong> 2
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> text = "leetcode"
<strong>Output:</strong> 0
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= text.length &lt;= 10<sup>4</sup></code></li>
	<li><code>text</code> consists of lower case English letters only.</li>
</ul>

<p>&nbsp;</p>
<p><strong>Note:</strong> This question is the same as <a href="https://leetcode.com/problems/rearrange-characters-to-make-target-string/description/" target="_blank"> 2287: Rearrange Characters to Make Target String.</a></p>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Table`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(5 -> 1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} text
 * @return {number}
 */
const maxNumberOfBalloons = function (text) {
  const balloonSet = new Set('balloon');
  const balloonMap = new Map();
  let result = text.length;

  for (const char of text) {
    if (!balloonSet.has(char)) continue;

    const count = balloonMap.get(char) ?? 0;

    balloonMap.set(char, count + 1);
  }

  for (const char of balloonSet) {
    const count = balloonMap.get(char);

    if (!count) return 0;

    const freq = char === 'l' || char === 'o' ? Math.floor(count / 2) : count;

    result = Math.min(freq, result);
  }

  return result;
};
```
