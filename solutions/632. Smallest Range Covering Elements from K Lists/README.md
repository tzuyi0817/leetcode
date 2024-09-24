# [632. Smallest Range Covering Elements from K Lists](https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists)

## Description

<div class="elfjS" data-track-load="description_content"><p>You have <code>k</code> lists of sorted integers in <strong>non-decreasing&nbsp;order</strong>. Find the <b>smallest</b> range that includes at least one number from each of the <code>k</code> lists.</p>

<p>We define the range <code>[a, b]</code> is smaller than range <code>[c, d]</code> if <code>b - a &lt; d - c</code> <strong>or</strong> <code>a &lt; c</code> if <code>b - a == d - c</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]
<strong>Output:</strong> [20,24]
<strong>Explanation: </strong>
List 1: [4, 10, 15, 24,26], 24 is in range [20,24].
List 2: [0, 9, 12, 20], 20 is in range [20,24].
List 3: [5, 18, 22, 30], 22 is in range [20,24].
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [[1,2,3],[1,2,3],[1,2,3]]
<strong>Output:</strong> [1,1]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>nums.length == k</code></li>
	<li><code>1 &lt;= k &lt;= 3500</code></li>
	<li><code>1 &lt;= nums[i].length &lt;= 50</code></li>
	<li><code>-10<sup>5</sup> &lt;= nums[i][j] &lt;= 10<sup>5</sup></code></li>
	<li><code>nums[i]</code>&nbsp;is sorted in <strong>non-decreasing</strong> order.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Sliding Window`**

- Time complexity: <em>O((nk)log(nk))</em>
- Space complexity: <em>O(nk)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} nums
 * @return {number[]}
 */
const smallestRange = function (nums) {
  const k = nums.length;
  const coverMap = new Map();
  const elements = nums.reduce((result, list, index) => {
    for (const num of list) {
      result.push({ num, index });
    }
    return result;
  }, []);
  let left = (coverCount = 0);
  let minRange = Number.MAX_SAFE_INTEGER;

  elements.sort((a, b) => a.num - b.num);

  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];
    const count = coverMap.get(element.index) ?? 0;

    if (!count) coverCount += 1;
    coverMap.set(element.index, count + 1);

    while (coverCount === k) {
      const leftElement = elements[left];
      const range = element.num - leftElement.num;
      const leftCount = coverMap.get(leftElement.index);

      if (range < minRange) {
        minRange = range;
        result = [leftElement.num, element.num];
      }
      coverMap.set(leftElement.index, leftCount - 1);
      if (leftCount - 1 === 0) coverCount -= 1;
      left += 1;
    }
  }
  return result;
};
```
