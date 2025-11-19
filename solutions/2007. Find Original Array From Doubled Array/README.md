# [2007. Find Original Array From Doubled Array](https://leetcode.com/problems/find-original-array-from-doubled-array)

## Description

<div class="elfjS" data-track-load="description_content"><p>An integer array <code>original</code> is transformed into a <strong>doubled</strong> array <code>changed</code> by appending <strong>twice the value</strong> of every element in <code>original</code>, and then randomly <strong>shuffling</strong> the resulting array.</p>

<p>Given an array <code>changed</code>, return <code>original</code><em> if </em><code>changed</code><em> is a <strong>doubled</strong> array. If </em><code>changed</code><em> is not a <strong>doubled</strong> array, return an empty array. The elements in</em> <code>original</code> <em>may be returned in <strong>any</strong> order</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> changed = [1,3,4,2,6,8]
<strong>Output:</strong> [1,3,4]
<strong>Explanation:</strong> One possible original array could be [1,3,4]:
- Twice the value of 1 is 1 * 2 = 2.
- Twice the value of 3 is 3 * 2 = 6.
- Twice the value of 4 is 4 * 2 = 8.
Other original arrays could be [4,3,1] or [3,1,4].
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> changed = [6,3,0,1]
<strong>Output:</strong> []
<strong>Explanation:</strong> changed is not a doubled array.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> changed = [1]
<strong>Output:</strong> []
<strong>Explanation:</strong> changed is not a doubled array.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= changed.length &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= changed[i] &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} changed
 * @return {number[]}
 */
const findOriginalArray = function (changed) {
  const changedMap = changed.reduce((map, value) => {
    const count = map.get(value) ?? 0;

    return map.set(value, count + 1);
  }, new Map());
  const result = [];
  const values = [...changedMap.keys()].toSorted((a, b) => a - b);

  for (const value of values) {
    const count = changedMap.get(value);

    if (!count) continue;
    if (value === 0) {
      if (count % 2) return [];
      result.push(...new Array(count / 2).fill(0));
      continue;
    }
    if (changedMap.has(value * 2)) {
      const doubledCount = changedMap.get(value * 2);

      if (count > doubledCount) return [];
      result.push(...new Array(count).fill(value));
      changedMap.set(value * 2, doubledCount - count);
      continue;
    }
    return [];
  }
  return result;
};
```
