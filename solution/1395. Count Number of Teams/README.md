# [1395. Count Number of Teams](https://leetcode.com/problems/count-number-of-teams)

## Description

<div class="_1l1MA" data-track-load="description_content"><p>There are <code>n</code> soldiers standing in a line. Each soldier is assigned a <strong>unique</strong> <code>rating</code> value.</p>

<p>You have to form a team of 3 soldiers amongst them under the following rules:</p>

<ul>
	<li>Choose 3 soldiers with index (<code>i</code>, <code>j</code>, <code>k</code>) with rating (<code>rating[i]</code>, <code>rating[j]</code>, <code>rating[k]</code>).</li>
	<li>A team is valid if: (<code>rating[i] &lt; rating[j] &lt; rating[k]</code>) or (<code>rating[i] &gt; rating[j] &gt; rating[k]</code>) where (<code>0 &lt;= i &lt; j &lt; k &lt; n</code>).</li>
</ul>

<p>Return the number of teams you can form given the conditions. (soldiers can be part of multiple teams).</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> rating = [2,5,3,4,1]
<strong>Output:</strong> 3
<strong>Explanation:</strong> We can form three teams given the conditions. (2,3,4), (5,4,1), (5,3,1). 
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> rating = [2,1,3]
<strong>Output:</strong> 0
<strong>Explanation:</strong> We can't form any team given the conditions.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> rating = [1,2,3,4]
<strong>Output:</strong> 4
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == rating.length</code></li>
	<li><code>3 &lt;= n &lt;= 1000</code></li>
	<li><code>1 &lt;= rating[i] &lt;= 10<sup>5</sup></code></li>
	<li>All the integers in <code>rating</code> are <strong>unique</strong>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**
- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} rating
 * @return {number}
 */
var numTeams = function(rating) {
    let result = 0;

    for (let index = 1; index < rating.length - 1; index++) {
        const rate = rating[index];
        let leftBigger = leftSmaller = 0;
        let rightBigger = rightSmaller = 0;

        for (let left = 0; left < index; left++) {
            rate < rating[left] ? leftBigger += 1 : leftSmaller += 1;
        }
        for (let right = index + 1; right < rating.length; right++) {
            rate < rating[right] ? rightBigger += 1 : rightSmaller += 1;
        }
        result += leftBigger * rightSmaller + leftSmaller * rightBigger;
    }
    return result;
};
```

<p>&nbsp;</p>

**Solution: `Binary Indexed Tree`**
- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} rating
 * @return {number}
 */
var numTeams = function(rating) {
    const n = rating.length;
    const sortedRating = [...rating].sort((a, b) => a - b);
    let bit = Array(n + 2).fill(0);

    const getIndex = (value) => {
        let left = 0;
        let right = n - 1;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);

            sortedRating[mid] >= value ? right = mid : left = mid + 1;
        }
        return left;
    };

    const updateBit = (index) => {
        while (index < bit.length) {
            bit[index] += 1;
            index += index & -index;
        }
    };

    const queryBit = (index) => {
        let count = 0;

        while (index > 0) {
            count += bit[index];
            index -= index & -index;
        }
        return count;
    };
    let result = 0;

    for (const value of rating) {
        const index = getIndex(value);
        const leftSmallerCount = queryBit(index);
        const leftBiggerCount = queryBit(n) - queryBit(index + 1);
        const rightSmallerCount = index - leftSmallerCount;
        const rightBiggerCount = n - index - 1 - leftBiggerCount;

        updateBit(index + 1);
        result += leftSmallerCount * rightBiggerCount + leftBiggerCount * rightSmallerCount;
    }
    return result;
};
```
