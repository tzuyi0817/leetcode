# [1079. Letter Tile Possibilities](https://leetcode.com/problems/letter-tile-possibilities)

## Description

<div class="elfjS" data-track-load="description_content"><p>You have <code>n</code>&nbsp;&nbsp;<code>tiles</code>, where each tile has one letter <code>tiles[i]</code> printed on it.</p>

<p>Return <em>the number of possible non-empty sequences of letters</em> you can make using the letters printed on those <code>tiles</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> tiles = "AAB"
<strong>Output:</strong> 8
<strong>Explanation: </strong>The possible sequences are "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA".
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> tiles = "AAABBC"
<strong>Output:</strong> 188
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> tiles = "V"
<strong>Output:</strong> 1
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= tiles.length &lt;= 7</code></li>
	<li><code>tiles</code> consists of uppercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Backtracking`**

- Time complexity: <em>O(n!)</em>
- Space complexity: <em>O(26 -> 1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} tiles
 * @return {number}
 */
const numTilePossibilities = function (tiles) {
  const BASE_CODE = 'A'.charCodeAt(0);
  const n = tiles.length;
  const letters = Array.from({ length: 26 }, () => 0);

  for (const letter of tiles) {
    const code = letter.charCodeAt(0) - BASE_CODE;

    letters[code] += 1;
  }

  const getPossibilities = () => {
    let result = 0;

    for (let code = 0; code < 26; code++) {
      if (!letters[code]) continue;

      letters[code] -= 1;
      result += 1 + getPossibilities();
      letters[code] += 1;
    }

    return result;
  };

  return getPossibilities();
};
```
