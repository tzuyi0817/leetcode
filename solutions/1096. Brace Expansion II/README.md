# [1096. Brace Expansion II](https://leetcode.com/problems/brace-expansion-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>Under the grammar given below, strings can represent a set of lowercase words. Let&nbsp;<code>R(expr)</code>&nbsp;denote the set of words the expression represents.</p>

<p>The grammar can best be understood through simple examples:</p>

<ul>
	<li>Single letters represent a singleton set containing that word.
	<ul>
		<li><code>R("a") = {"a"}</code></li>
		<li><code>R("w") = {"w"}</code></li>
	</ul>
	</li>
	<li>When we take a comma-delimited list of two or more expressions, we take the union of possibilities.
	<ul>
		<li><code>R("{a,b,c}") = {"a","b","c"}</code></li>
		<li><code>R("{{a,b},{b,c}}") = {"a","b","c"}</code> (notice the final set only contains each word at most once)</li>
	</ul>
	</li>
	<li>When we concatenate two expressions, we take the set of possible concatenations between two words where the first word comes from the first expression and the second word comes from the second expression.
	<ul>
		<li><code>R("{a,b}{c,d}") = {"ac","ad","bc","bd"}</code></li>
		<li><code>R("a{b,c}{d,e}f{g,h}") = {"abdfg", "abdfh", "abefg", "abefh", "acdfg", "acdfh", "acefg", "acefh"}</code></li>
	</ul>
	</li>
</ul>

<p>Formally, the three rules for our grammar:</p>

<ul>
	<li>For every lowercase letter <code>x</code>, we have <code>R(x) = {x}</code>.</li>
	<li>For expressions <code>e<sub>1</sub>, e<sub>2</sub>, ... , e<sub>k</sub></code> with <code>k &gt;= 2</code>, we have <code>R({e<sub>1</sub>, e<sub>2</sub>, ...}) = R(e<sub>1</sub>) ∪ R(e<sub>2</sub>) ∪ ...</code></li>
	<li>For expressions <code>e<sub>1</sub></code> and <code>e<sub>2</sub></code>, we have <code>R(e<sub>1</sub> + e<sub>2</sub>) = {a + b for (a, b) in R(e<sub>1</sub>) × R(e<sub>2</sub>)}</code>, where <code>+</code> denotes concatenation, and <code>×</code> denotes the cartesian product.</li>
</ul>

<p>Given an expression representing a set of words under the given grammar, return <em>the sorted list of words that the expression represents</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> expression = "{a,b}{c,{d,e}}"
<strong>Output:</strong> ["ac","ad","ae","bc","bd","be"]
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> expression = "{{a,z},a{b,c},{ab,z}}"
<strong>Output:</strong> ["a","ab","ac","z"]
<strong>Explanation:</strong> Each distinct word is written only once in the final answer.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= expression.length &lt;= 60</code></li>
	<li><code>expression[i]</code> consists of <code>'{'</code>, <code>'}'</code>, <code>','</code>or lowercase English letters.</li>
	<li>The given&nbsp;<code>expression</code>&nbsp;represents a set of words based on the grammar given in the description.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Depth-First Search`**

- Time complexity: <em>O(2<sup>m</sup>+klogk)</em>
- Space complexity: <em>O(m+k)</em>
  - `m` is the total number of combinations
  - `k` is the final number of results produced

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} expression
 * @return {string[]}
 */
const braceExpansionII = function (expression) {
  const n = expression.length;

  const mergeGroup = (groupA, groupB) => {
    if (!groupA.length) return groupB;
    const result = [];

    for (const wordA of groupA) {
      for (const wordB of groupB) {
        result.push(`${wordA}${wordB}`);
      }
    }
    return result;
  };

  const braceWord = (start, end) => {
    const result = new Set();
    const groups = [[]];
    let left = start;
    let layer = 0;

    for (let index = start; index <= end; index++) {
      const current = expression[index];

      if (current === '{') {
        if (layer === 0) {
          left = index + 1;
        }
        layer += 1;
      } else if (current === '}') {
        if (layer === 1) {
          const group = mergeGroup(groups.at(-1), braceWord(left, index - 1));

          groups[groups.length - 1] = group;
        }
        layer -= 1;
      } else if (current === ',' && layer === 0) {
        groups.push([]);
      } else if (layer === 0) {
        const group = mergeGroup(groups.at(-1), [current]);

        groups[groups.length - 1] = group;
      }
    }

    for (const group of groups) {
      for (const word of group) {
        result.add(word);
      }
    }
    return [...result];
  };

  return braceWord(0, n - 1).sort();
};
```
