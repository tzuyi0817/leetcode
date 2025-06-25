# [1815. Maximum Number of Groups Getting Fresh Donuts](https://leetcode.com/problems/maximum-number-of-groups-getting-fresh-donuts)

## Description

<div class="elfjS" data-track-load="description_content"><p>There is a donuts shop that bakes donuts in batches of <code>batchSize</code>. They have a rule where they must serve <strong>all</strong> of the donuts of a batch before serving any donuts of the next batch. You are given an integer <code>batchSize</code> and an integer array <code>groups</code>, where <code>groups[i]</code> denotes that there is a group of <code>groups[i]</code> customers that will visit the shop. Each customer will get exactly one donut.</p>

<p>When a group visits the shop, all customers of the group must be served before serving any of the following groups. A group will be happy if they all get fresh donuts. That is, the first customer of the group does not receive a donut that was left over from the previous group.</p>

<p>You can freely rearrange the ordering of the groups. Return <em>the <strong>maximum</strong> possible number of happy groups after rearranging the groups.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> batchSize = 3, groups = [1,2,3,4,5,6]
<strong>Output:</strong> 4
<strong>Explanation:</strong> You can arrange the groups as [6,2,4,5,1,3]. Then the 1<sup>st</sup>, 2<sup>nd</sup>, 4<sup>th</sup>, and 6<sup>th</sup> groups will be happy.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> batchSize = 4, groups = [1,3,2,5,2,2,1,6]
<strong>Output:</strong> 4
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= batchSize &lt;= 9</code></li>
	<li><code>1 &lt;= groups.length &lt;= 30</code></li>
	<li><code>1 &lt;= groups[i] &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n<sup>batchSize</sup>)</em>
- Space complexity: <em>O(n<sup>batchSize</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} batchSize
 * @param {number[]} groups
 * @return {number}
 */
const maxHappyGroups = function (batchSize, groups) {
  const customers = Array.from({ length: batchSize }, () => 0);
  const memo = new Map();
  let happyGroups = 0;

  for (const customer of groups) {
    const leftOver = customer % batchSize;

    if (leftOver) {
      const other = batchSize - leftOver;

      if (customers[other]) {
        customers[other] -= 1;
        happyGroups += 1;
      } else {
        customers[leftOver] += 1;
      }
    } else {
      happyGroups += 1;
    }
  }

  const getHappyGroups = leftOver => {
    const key = `${customers.join(',')},${leftOver}`;

    if (memo.has(key)) return memo.get(key);
    let result = 0;

    for (let index = 1; index < batchSize; index++) {
      if (!customers[index]) continue;
      const nextLeftOver = (leftOver + index) % batchSize;

      customers[index] -= 1;
      const happyGroups = getHappyGroups(nextLeftOver);
      const totalHappyGroups = leftOver ? happyGroups : happyGroups + 1;

      customers[index] += 1;
      result = Math.max(totalHappyGroups, result);
    }

    memo.set(key, result);

    return result;
  };

  return happyGroups + getHappyGroups(0);
};
```
